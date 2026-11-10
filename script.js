(() => {
  "use strict";
  const {areas,directions,routes}=window.CROSSROADS;
  const {clues,npc,quests,actions}=window.STORY;
  const zh=window.ZH;
  let locale="zh-HK", tutorial=-1, tutorialOrigin=null;
  const translations=new Map(Object.entries(window.UI_ZH));
  function pair(en,translated){
    if(Array.isArray(en)) en.forEach((item,index)=>pair(item,translated[index]));
    else translations.set(en,translated);
  }
  for(const [index,area] of areas.entries()){
    pair(area.name,zh.areas[index]);
    for(const [id,name] of area.objects)pair(name,zh.objects[id]);
  }
  for(const [id,route] of Object.entries(routes))pair(Object.values(route),zh.routes[id]);
  for(const [id,value] of Object.entries(clues))pair(value,zh.clues[id]);
  for(const [id,value] of Object.entries(npc))pair(value,zh.npc[id]);
  for(const [id,value] of Object.entries(quests))pair(Object.values(value),zh.quests[id]);
  for(const [id,value] of Object.entries(actions))pair(value,zh.actions[id]);
  function t(text){if(window.MOBILE_COPY?.[text])return window.MOBILE_COPY[text][locale==="en"?0:1];if(window.RESULT_COPY[text])return window.RESULT_COPY[text][locale==="en"?0:1];if(window.TRANSFER_COPY[text])return window.TRANSFER_COPY[text][locale==="en"?0:1];if(window.DEPTH_COPY[text])return window.DEPTH_COPY[text][locale==="en"?0:1];if(window.FINAL_COPY[text])return window.FINAL_COPY[text][locale==="en"?0:1];return locale==="en"?window.EN[text]??text:translations.get(text)??text;}
  const byId=id=>document.getElementById(id);
  function updateText(id,text){
    const element=byId(id);
    if(element.textContent!==text)element.textContent=text;
  }
  const map=byId("map"), ctx=map.getContext("2d"), box=byId("box");
  const keys=new Set();
  const touchKeys=new Map();
  const phone=typeof matchMedia==="function"?matchMedia("(max-width: 600px), (hover: none) and (pointer: coarse) and (max-width: 1000px)"):null;
  const isMobile=()=>Boolean(phone?.matches);
  function inputHeld(key){
    if(keys.has(key))return true;
    for(const held of touchKeys.values())if(held===key)return true;
    return false;
  }
  let facing="front";
  const newGame=()=>({area:0,x:98,y:177,seen:new Set(),done:new Set(),slots:2,evidence:new Set(),consulted:new Map(),questDrafts:{},activityResults:new Map(),researchGap:false,followUp:null,phase:0,initial:null,route:null,action:[],ending:false});
  let game=newGame(), target=null, waypoints=[], last=0, moving=false, time=0;
  const phases=["Recognise","Reappraise","Revise","Respond"];
  const button=(name,run,disabled=false)=>({name,run,disabled});
  const close=()=>box.close();
  function show(speaker,message,buttons=[button("Back to the world",close)],label="",view=""){
    box.className=view;
    byId("summary-tools").replaceChildren();
    keys.clear();
    touchKeys.clear();
    target=null;
    byId("speaker").textContent=t(speaker);
    const portrait=speaker==="Dr Chan"?["academic",[speaker]]:Object.entries(npc).find(([,value])=>value[0]===speaker);
    byId("portrait").className=portrait?"portrait "+portrait[0]:"";
    const portraitBox=byId("portrait");
    portraitBox.textContent=portrait?t(portrait[1][0]).slice(0,1):"";
    if(portraitBox.style){
      portraitBox.style.backgroundImage=portrait?portraitImage(portrait[0]):"";
      portraitBox.style.color=portrait?"transparent":"";
    }
    byId("label").textContent=t(label);
    byId("message").textContent=t(message);
    byId("answers").replaceChildren(...buttons.map(option=>{
      const el=document.createElement("button");
      el.textContent=t(option.name);el.disabled=option.disabled;el.onclick=option.run;
      return el;
    }));
    if(!box.open)box.showModal();
    byId("answers").querySelector("button:not(:disabled)")?.focus();
  }
  const has=id=>game.evidence.has(id);
  const hasWorkClue=()=>["survey","brief","record"].some(has);
  const hasCommunication=()=>has("brief")&&has("record");
  function guidance(heading,value){
    return t(heading)+": "+t(value);
  }
  function recordSupport(id,key){
    if(!game.consulted.has(id))game.consulted.set(id,new Set());
    game.consulted.get(id).add(key);
  }
  function conversation(id,name,key,choices){
    recordSupport(id,key);
    const next=id==="advisor"||id==="recruiter"?"event.lead":"event.use";
    show(name,t(key)+"\n\n"+guidance("event.next",next),choices,"event.support","support");
  }
  function discover(id){
    game.evidence.add(id);
    const source={record:"friend",feedback:"academic",lead:"advisor"}[id];
    if(source)recordSupport(source,id+".note");
    show(id,t(id+".note")+"\n\n"+guidance("event.next",id==="lead"?"event.lead":"event.use"),
      undefined,source?"event.support":"event.evidence",source?"support":"evidence");
  }
  function read(id){
    if(id==="evidence")return show("Dissertation folder","clue.uncertain",[
      button("survey",()=>discover("survey")),button("brief",()=>discover("brief")),button("Close",close)
    ],"Field notes");
    const [title,...pages]=clues[id];
    game.seen.add(id);
    if(id==="ads")game.evidence.add("requirements");
    if(id==="email"&&game.phase===0)game.phase=1;
    const next={email:"Review your application on campus",cv:"clue.objective",ads:"Visit the café planning table",board:"event.workbench"}[id];
    const source=id==="cv"?t(pages[0])+"\n\n"+guidance("result.before","result.cv.old"):pages[0];
    show(title,source,[button("Read your notes",()=>show(title,t(pages[1])+"\n\n"+guidance("event.next",next),undefined,"event.evidence","evidence")),button("Close",close)],"Field notes");
  }
  function speak(id){
    if(id==="academic")return conversation(id,"Dr Chan","academic.intro",[
      button("chan.prompt",()=>{
        game.evidence.add("survey");
        discover("feedback");
      }),
      button("chan.brief",()=>{
        game.evidence.add("brief");
        recordSupport("academic","chan.brief.note");
        show("Dr Chan",t("chan.brief.note")+"\n\n"+guidance("event.next","event.use"),undefined,"event.support","support");
      }),button("Back to the world",close)
    ]);
    const [name,first,follow]=npc[id];
    game.seen.add(id);
    const changed={friend:has("record"),advisor:game.done.has("connect"),mentor:game.seen.has("ads"),recruiter:hasEditedEvidence()};
    const choice=[button("Back to the world",close)];
    if(id==="advisor")choice.unshift(button("Prepare an enquiry · 1 slot",()=>sideQuest("connect"),!game.seen.has("cv")||!game.slots||game.done.has("connect")));
    if(id==="friend")choice.unshift(button("clue.friend",()=>discover("record")));
    const direction=game.route||game.initial;
    if(id==="advisor"){
      choice.unshift(button("lead.prompt",()=>discover("lead")));
      if(hasWorkClue()){
        const focus=direction||(has("survey")?"research":hasCommunication()?"access":"community");
        const advice=focus==="research"&&!has("survey")?"clue.uncertain":"clue.career."+focus;
        return conversation(id,name,advice,choice);
      }
    }
    if(id==="mentor"&&(hasWorkClue()||direction)){
      return conversation(id,name,direction==="access"?"mentor.access":"mentor.note",choice);
    }
    if(id==="recruiter"){
      if(game.initial==="research"||has("lead"))choice.unshift(button("research.inspect",()=>inspectVacancy("recruiter")));
      if(direction==="access")return conversation(id,name,"recruiter.access",choice);
      if(has("survey")&&!hasEditedEvidence())return conversation(id,name,"recruiter.note",choice);
    }
    conversation(id,name,changed[id]?follow:first,choice);
  }
  function inspectVacancy(source){
    game.researchGap=true;
    game.evidence.add("requirements");
    if(source==="recruiter")recordSupport(source,"research.gap");
    show("requirements",t("research.gap")+"\n\n"+guidance("event.next","event.revise"),undefined,"event.blocked","blocked");
  }
  function decision(title,options,onComplete,label){
    function choose(){
      show(title,"decision.prompt",[
        ...options.map(option=>button(option.key,()=>review(option))),
        button("Put draft aside",close)
      ],label);
    }
    function review(option){
      const problem=option.missing?.();
      const feedback=problem||option.note;
      show("decision.review",t(option.key)+(feedback?"\n\n"+t(feedback):""),[
        ...(problem?[]:[button("decision.save",()=>onComplete(option.key))]),
        button("decision.revise",choose),button("Put draft aside",close)
      ],label);
    }
    choose();
  }
  function evidenceChoices(){
    return [
      {key:has("feedback")?"decision.research.coached":"decision.research",missing:()=>!has("survey")&&"decision.survey.missing",note:has("requirements")||game.questDrafts.explore==="decision.compare"?"decision.data.fit":null},
      {key:"decision.communication",missing:()=>!hasCommunication()&&"decision.communication.missing",note:"decision.communication.fit"},
      {key:"decision.cautious",note:"decision.unconfirmed"}
    ];
  }
  const hasEditedEvidence=()=>game.done.has("build")&&game.questDrafts.build!=="decision.cautious";
  const hasOutreachLead=()=>game.questDrafts.connect==="decision.entry";
  const hasHoursComparison=()=>game.questDrafts.explore==="decision.hours";
  function createActivityResult(id,selected){
    if(id==="explore"){
      const fit=has("survey")?"result.fit.survey":hasCommunication()?"result.fit.brief":"result.fit.none";
      return {id, outcome:[
        ["result.research","result.research.fact"],["result.community","result.community.fact"],
        ["result.output",selected==="decision.hours"?"result.hours":"result.compare"]
      ],effects:[fit,...(has("survey")&&hasCommunication()?["result.fit.brief"]:[])],
        unknown:"result.compare.unknown",next:"result.compare.next"};
    }
    if(id==="build"){
      const statement={
        "decision.research":"result.cv.survey","decision.research.coached":"result.cv.coached",
        "decision.communication":"result.cv.brief"
      }[selected];
      return {id,outcome:statement?[["result.before","result.cv.old"],["result.after",statement]]:
        [["result.output","result.cv.check"]],
        effects:[statement?"result.cv.effect":"result.cv.check.effect"],unknown:"result.cv.unknown",
        next:statement?"result.cv.next":"result.cv.check.next"};
    }
    const key=selected==="decision.entry"?"result.connect.entry":"result.connect.support";
    return {id,outcome:[["result.output",key]],effects:[key+".effect"],unknown:key+".unknown",next:key+".next"};
  }
  function activityFacts(result){
    return [
      ["result.what",t(quests[result.id].name)],
      ...result.outcome.map(([key,value])=>[key,t(value)]),
      ["result.effect",result.effects.map(t).join(" ")],
      ["result.unknown",t(result.unknown)],
      ["result.next",t(result.next)]
    ];
  }
  function activityText(result){
    return activityFacts(result).map(([key,value])=>t(key)+": "+value).join("\n");
  }
  function showActivityResult(result,back=close,backLabel="Continue"){
    show(result.id==="explore"?"result.comparison":"result.title","",[button(backLabel,back)],"result.title","result");
    const cards=activityFacts(result).map(([key,value])=>factCard(key,value,"result-row"));
    const saved=document.createElement("p");
    saved.className="result-saved";
    saved.textContent=t("result.saved");
    byId("message").replaceChildren(...cards,saved);
  }
  function resultButtons(back,label){
    return [...game.activityResults.values()].map(result=>button(
      t("result.reopen")+" · "+t(quests[result.id].resource),()=>showActivityResult(result,back,label)));
  }
  function sideQuest(id){
    const task=quests[id];
    const need={explore:"ads",connect:"cv"}[id];
    if(game.activityResults.has(id))return showActivityResult(game.activityResults.get(id));
    if(id==="build"&&!hasWorkClue())return show(task.name,"clue.objective");
    if(need&&!game.seen.has(need))return show(task.name,t("Find first: ")+t(clues[need][0]));
    if(!game.slots)return show(task.name,"Your optional work slots are used. You can still explore and complete your final action.");
    const options=id==="build"?evidenceChoices():id==="explore"?
      [{key:"decision.compare"},{key:"decision.hours"}]:[{key:"decision.entry"},{key:"decision.support"}];
    decision(task.name,options,selected=>{
      show(task.name,"Finish this draft to use one optional activity. Exploring, conversations and reading are free.",[
        button("Confirm · use 1 activity",()=>{
          if(game.done.has(id)||!game.slots)return;
          const result=createActivityResult(id,selected);
          game.slots--;game.done.add(id);game.questDrafts[id]=selected;
          game.activityResults.set(id,result);
          showActivityResult(result);
        }),button("Cancel",close)
      ],"Optional activity");
    },"Optional quest · 1 slot on completion");
  }
  function routeOptions(){
    return Object.entries(routes).map(([id,r])=>button(r.name,()=>chooseRoute(id)));
  }
  function chooseRoute(id,followUp=null){
    const route=routes[id];
    if(!game.initial){
      game.initial=id;game.phase=2;
      show(route.name,t(route.setback)+"\n\n"+guidance("event.next","event.revise"),[button("Revisit the planning table",close)],"event.blocked","blocked");
      return;
    }
    game.route=id;game.phase=3;game.followUp=followUp;
    const extra=id==="community"&&hasOutreachLead()?"Yan’s paid outreach lead is available.":id==="research"&&hasEditedEvidence()?"Leung can point you towards paid evaluation support roles.":id==="access"&&hasHoursComparison()?"Your comparison rules out assuming that daytime hours will fit.":"Use the public resources board to check the next feasible step.";
    show(route.name,t("summary.first")+" · "+t(routes[game.initial].name)+"\n"+t("summary.revised")+" · "+t(mainPath())+"\n\n"+t(followUp?followUp+".note":extra)+"\n\n"+guidance("event.next","event.workbench"),[button("Go to the Career Centre workbench",close)],"event.route","evidence");
  }
  function plan(){
    if(game.ending)return ending();
    if(!game.initial){
      const missing=["email","cv","ads"].filter(id=>!game.seen.has(id));
      if(missing.length)return show("Planning table",t("Read these before committing: ")+missing.map(id=>t(clues[id][0])).join(" / "));
      if(!hasWorkClue())return show("Planning table","clue.objective");
      return show("Sketch a provisional route","Which direction would you investigate this week? Each route has different constraints.",routeOptions(),"Reappraise");
    }
    const options=routeOptions();
    if(game.researchGap){
      for(const key of ["research.clarify","research.related"])options.unshift(button(key,()=>{
        chooseRoute("research",key);
      }));
    }else if(game.initial==="research"||has("lead"))options.unshift(button("research.inspect",inspectVacancy));
    show("Revise the route",t(routes[game.initial].setback)+"\n\n"+t("Keep the original community goal, choose a related direction, or refine what matters to you."),options,"Revise");
  }
  function mainPath(){
    if(game.followUp)return game.followUp;
    if(game.route==="community"&&hasOutreachLead())return "Follow Yan’s paid outreach lead and verify the hours";
    if(game.route==="research"&&hasEditedEvidence())return "Use the edited CV to investigate Leung’s paid evaluation support lead";
    if(game.route==="access"&&hasHoursComparison())return "Use your role comparison to screen paid communications posts for compatible hours";
    return routes[game.route].main;
  }
  function finalAction(){
    if(game.ending)return ending();
    const title=actions[game.route][0];
    const options=evidenceChoices();
    if(game.followUp)options.unshift({key:game.followUp,note:game.followUp+".note"});
    if(game.questDrafts.connect==="decision.support")options.push({key:"decision.support",note:"decision.unconfirmed"});
    if(game.route==="community"&&hasOutreachLead())options.unshift({key:"Include Yan’s paid outreach lead"});
    if(game.route==="research"&&hasEditedEvidence()){
      options.unshift({key:game.questDrafts.build});
    }
    if(game.route==="access"&&hasHoursComparison())options.unshift({key:"Include your comparison of confirmed and unconfirmed hours"});
    const unique=[...new Map(options.map(option=>[option.key,option])).values()];
    decision(title,unique,selected=>{
      game.action=[selected];game.ending=true;endingArrival();
    },"Final action · no slot needed");
  }
  function replay(){
    game=newGame();tutorial=-1;tutorialOrigin=null;keys.clear();target=null;waypoints=[];facing="front";
    introduction();
  }
  function endingArrival(){
    const route=routes[game.route];
    const key="end."+game.route;
    show(route.ending,[
      t(key+".sub"),t(key+".scene"),
      guidance("summary.revised",mainPath()),guidance("summary.action",game.action[0]),
      t(key+".ask"),t("ending.header")
    ].join("\n\n"),[button("summary.title",ending),button("Play Again",replay)],"event.ending",game.route);
  }
  function discovered(){
    return [...game.evidence].map(id=>t(id)).concat(
      ["email","cv","board"].filter(id=>game.seen.has(id)).map(id=>t(clues[id][0]))
    );
  }
  function supportReceived(){
    return [...game.consulted].map(([id,notes])=>{
      const name=id==="academic"?"Dr Chan":npc[id][0];
      return t(name)+" · "+[...notes].map(t).join(" ");
    });
  }
  function supportHighlights(){
    const priorities={
      community:["advisor","friend","mentor","academic","recruiter"],
      research:["academic","recruiter","advisor","mentor","friend"],
      access:["friend","recruiter","mentor","advisor","academic"]
    }[game.route];
    return priorities.filter(id=>game.consulted.has(id)).slice(0,3).map(id=>{
      const notes=game.consulted.get(id);
      const keys=[...notes];
      const [name,first,follow]=npc[id]||["Dr Chan"];
      const highlight={
        friend:notes.has("record.note")?"syn.friend.record":notes.has(follow)?"syn.friend.brief":"syn.friend.first",
        academic:notes.has("feedback.note")?"syn.academic.feedback":notes.has("chan.brief.note")?"syn.academic.brief":"syn.academic.first",
        advisor:game.activityResults.has("connect")?"syn.advisor.connect":notes.has("lead.note")?"syn.advisor.lead":
          keys.some(key=>key.startsWith("clue.career."))?"syn.advisor.advice":notes.has(first)?"syn.advisor.first":null,
        mentor:notes.has(first)||notes.has("mentor.note")?"syn.mentor.route":"syn.mentor.hours",
        recruiter:notes.has("research.gap")||notes.has("recruiter.note")||notes.has(first)?"syn.recruiter.interview":
          notes.has("recruiter.access")?"syn.recruiter.hours":"syn.recruiter.lead"
      }[id];
      return highlight?t(name)+" · "+t(highlight):null;
    }).filter(Boolean);
  }
  function activityHighlights(){
    return [...game.activityResults.values()].map(result=>{
      if(result.id==="explore")return t("syn.activity.explore");
      if(result.id==="connect")return t("syn.activity.connect."+(hasOutreachLead()?"entry":"support"));
      const revised=result.outcome.find(([label])=>label==="result.after");
      return revised?t("syn.activity.build")+": "+t(revised[1]):t("syn.activity.buildcheck");
    });
  }
  function careerSynthesis(){
    const route=routes[game.route];
    const evidence=[has("survey")?"syn.data":null,hasCommunication()?"syn.communication":null].filter(Boolean).map(t);
    const jobs=[];
    if(!game.activityResults.has("explore")&&has("requirements")&&game.route==="community"){
      jobs.push(t("syn.community.role"));
    }
    if(game.seen.has("board")&&game.questDrafts.connect!=="decision.support")jobs.push(t("syn.resources.board"));
    const action=game.action[0];
    const completed={
      "decision.research":"syn.action.data","decision.research.coached":"syn.action.data",
      "decision.communication":"syn.action.communication","decision.cautious":"syn.action.cautious",
      "research.clarify":"syn.action.clarify","research.related":"syn.action.related",
      "decision.support":"syn.action.support","Include Yan’s paid outreach lead":"syn.action.outreach",
      "Include your comparison of confirmed and unconfirmed hours":"syn.action.hours"
    }[action];
    const next={
      "research.clarify":"summary.clarify","research.related":"summary.related",
      "decision.support":"summary.support","decision.cautious":"summary.cautious"
    }[action]||"syn.next."+game.route;
    const context=[];
    if(game.route==="research"&&game.initial!=="research"&&game.researchGap&&!game.activityResults.has("explore")){
      context.push(["syn.constraint",t("syn.stop.research")]);
    }
    if(game.route==="access"&&game.initial!=="access"&&!game.activityResults.has("explore")){
      context.push(["syn.uncertainty",t("syn.hours.unknown")]);
    }else if(game.route==="research"){
      context.push(["syn.uncertainty",t("syn.research.unknown")]);
    }
    return {
      ending:t(route.ending),meaning:t("end."+game.route+".sub"),
      pathway:[
        ["summary.original",t(routes.community.goal)],
        ["summary.setback",t("syn.stop."+game.initial)],
        ["summary.revised",t(game.route==="research"&&!game.followUp&&hasEditedEvidence()&&
          !game.consulted.get("recruiter")?.has(npc.recruiter[2])?route.main:mainPath())]
      ],
      context,
      resources:[
        ["summary.evidence","◇",evidence],["syn.jobs","▤",jobs],
        ["summary.people","✦",supportHighlights()],["summary.results","✓",activityHighlights()]
      ].filter(([, ,items])=>items.length),
      steps:[["summary.action",t(completed||action)],["summary.next",t(next)]],
      question:t("end."+game.route+".ask")
    };
  }
  function summaryText(){
    const data=careerSynthesis();
    const lines=entries=>entries.map(([key,value])=>t(key)+": "+value).join("\n");
    const resources=data.resources.map(([key,,items])=>t(key)+"\n"+items.map(item=>"• "+item).join("\n"));
    return [t("summary.title"),data.ending+"\n"+data.meaning,
      t("syn.path")+"\n"+lines([...data.pathway,...data.context]),
      ...(resources.length?[t("syn.resources")+"\n"+resources.join("\n\n")]:[]),
      t("syn.steps")+"\n"+lines(data.steps),t("group.title")+"\n"+data.question
    ].join("\n\n");
  }
  function factCard(key,value,className,icon=""){
    const row=document.createElement("section");
    row.className=className;
    const heading=document.createElement("h3");
    heading.textContent=(icon?icon+"  ":"")+t(key);
    const body=document.createElement("p");
    body.textContent=value;
    row.replaceChildren(heading,body);
    return row;
  }
  function displaySynthesis(data){
    function section(key,className,children){
      const panel=document.createElement("section");
      panel.className="synthesis-panel "+className;
      const heading=document.createElement("h3");
      heading.textContent=t(key);
      panel.replaceChildren(heading,...children);
      return panel;
    }
    const cards=data.pathway.map(([key,value],index)=>factCard(key,value,"synthesis-cell path-"+index));
    const flow=document.createElement("div");
    flow.className="synthesis-flow";
    const arrows=[0,1].map(()=>{
      const arrow=document.createElement("span");
      arrow.setAttribute("aria-hidden","true");
      arrow.textContent="→";
      return arrow;
    });
    flow.replaceChildren(cards[0],arrows[0],cards[1],arrows[1],cards[2]);
    const resources=data.resources.map(([key,icon,items])=>factCard(key,items.join("\n"),"synthesis-cell",icon));
    const steps=data.steps.map(([key,value],index)=>factCard(key,value,"synthesis-cell step-"+index,index?"↗":"✓"));
    const question=document.createElement("p");
    question.textContent=data.question;
    const discussion=document.createElement("button");
    discussion.textContent=t("Continue to Reflection");
    discussion.onclick=reflection;
    byId("message").replaceChildren(
      section("summary.ending","synthesis-ending",[factCard(data.ending,data.meaning,"synthesis-hero","◆")]),
      section("syn.path","synthesis-path",[flow,...data.context.map(([key,value])=>factCard(key,value,"synthesis-note"))]),
      section("syn.resources","synthesis-resources",resources),
      section("syn.steps","synthesis-steps",steps),
      section("group.title","synthesis-discussion",[question,discussion])
    );
  }
  function saveSummary(){
    const url=URL.createObjectURL(new Blob([summaryText()],{type:"text/plain;charset=utf-8"}));
    const link=document.createElement("a");
    link.href=url;
    link.download="career-action-summary.txt";
    link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function copySummary(){
    const feedback=byId("summary-tools");
    try{
      await navigator.clipboard.writeText(summaryText());
      if(box.className==="summary")feedback.textContent=t("summary.copied");
    }catch{
      if(box.className!=="summary")return;
      const prompt=document.createElement("p");
      prompt.textContent=t("summary.manual");
      const input=document.createElement("textarea");
      input.readOnly=true;
      input.setAttribute("aria-label",t("summary.title"));
      input.value=summaryText();
      feedback.replaceChildren(prompt,input);
      input.focus();input.select();
    }
  }
  function printSummary(){
    window.print();
  }
  function ending(){
    show("summary.title","",[
      button("summary.copy",copySummary),button("summary.save",saveSummary),
      button("summary.print",printSummary),
      button("Play Again",replay)
    ],"event.action","summary");
    displaySynthesis(careerSynthesis());
  }
  function reflection(){
    show("group.title","",[button("summary.title",ending),button("Play Again",replay),button("Close",close)],"","group");
    const subtitle=document.createElement("p");
    subtitle.className="group-subtitle";
    subtitle.textContent=t("group.subtitle");
    const cards=[
      ["↔","group.1",t(routes[game.initial].name)+" → "+t(mainPath())],
      ["◇","group.2",t("group.hint")],
      ["↗","group.3",t("group.example")]
    ].map(([icon,key,detail])=>{
      const card=document.createElement("section");
      card.className="group-card";
      const marker=document.createElement("span");
      marker.className="group-icon";
      marker.setAttribute("aria-hidden","true");
      marker.textContent=icon;
      const heading=document.createElement("h3");
      heading.textContent=t(key);
      const line=document.createElement("p");
      line.textContent=detail;
      card.replaceChildren(marker,heading,line);
      return card;
    });
    const reminder=document.createElement("p");
    reminder.className="group-reminder";
    reminder.textContent=t("group.workbook");
    byId("message").replaceChildren(subtitle,...cards,reminder);
  }
  const tutorialTasks=[
    ["email","Walk using WASD, arrow keys, or the on-screen arrows."],
    ["email","Approach the phone. Press E, tap Interact, or click the phone."],
    ["friend","Follow the gold marker to Ming and talk to him."],
    [null,"Open the journal with J or the Journal button."],
    ["cv","Follow the gold marker to the application folder and interact."]
  ];
  function objective(){
    if(tutorial>=0){
      const [id,text]=tutorialTasks[tutorial];
      const mobileText=["mobile.tutorial.move","mobile.tutorial.phone",null,"mobile.tutorial.journal"][tutorial];
      return [id,isMobile()&&mobileText?mobileText:text];
    }
    if(game.ending)return ["plan","Reflect on your choices"];
    if(game.route)return [game.area===1?"desk":"centre","Complete the final draft at the Career Centre workbench"];
    if(!game.seen.has("email"))return [game.area===0?"email":"campus","Read your phone on campus"];
    if(!game.seen.has("cv"))return [game.area===0?"cv":"campus","Review your application on campus"];
    if(!hasWorkClue())return [game.area===0?"evidence":"campus","clue.objective"];
    if(!game.seen.has("ads"))return [game.area===2?"ads":"cafe","Visit the café and read the vacancy board"];
    return [game.area===2?"plan":"cafe",game.initial?"Return to the planning table to revise your route":"Visit the café planning table"];
  }
  function journal(){
    if(tutorial===3)tutorial=4;
    const route=routes[game.route];
    show("Goal & Pathways Journal",[
      t("Main quest: ")+t(objective()[1]),
      t("Goal: ")+t(route?.goal||routes.community.goal),
      t("Original Plan A: paid graduate programme role (application rejected)"),
      t("Current pathway: ")+t(route?mainPath():game.initial?routes[game.initial].name:"Still exploring"),
      t("Alternatives: ")+t(route?.alt||(game.seen.has("ads")?"Paid community support, service research and accessible communication":"Investigate the vacancy board")),
      t("Obstacle: ")+t(game.initial?routes[game.initial].setback:"The rejection email gives no reason."),
      t("Optional quests available: ")+(Object.keys(quests).filter(id=>!game.done.has(id)&&game.slots).map(id=>t(quests[id].name)).join(" / ")||t("None")),
      t("Optional quests completed: ")+([...game.done].map(id=>t(quests[id].name)).join(" / ")||t("None"))
    ].join("\n\n"),[...resultButtons(journal,"Quest journal"),
      ...(game.ending?[button("View ending",ending)]:[]),button("Back to the world",close)],"Quest journal");
  }
  function inventory(){
    const entries=[...game.seen].filter(id=>clues[id]).map(id=>{
      const [name,description,use]=clues[id];
      return t(name)+" · "+t(id==="ads"?areas[2].name:id==="board"?areas[1].name:areas[0].name)+"\n"+t(description)+"\n"+t(use);
    });
    for(const id of game.evidence)entries.push(t(id)+"\n"+t(id+".note"));
    if(game.researchGap)entries.push(t("research.gap"));
    for(const result of game.activityResults.values())entries.push(activityText(result));
    show("Inventory",entries.join("\n\n")||"No resources yet. Inspect objects and talk to people around campus.",
      [...resultButtons(inventory,"Inventory"),
        ...(game.consulted.size?[button("Conversation",()=>show("Conversation",supportReceived().join("\n\n"),[button("Inventory",inventory)]))]:[]),
        button("Back to the world",close)],"Field notes and drafts");
  }
  function controlLabels(){
    for(const [id,label] of Object.entries({brand:"FROM LOST TO LAUNCHED / WEEK 4",title:"Career Crossroads",subtitle:"One Week to Graduation",journal:"Journal [J]",bag:"Inventory",pause:"Pause [Esc]",interact:"Interact [E]",controls:"WASD / arrows to move · E to interact · J for journal · Click a marked object to walk there"}))updateText(id,t(label));
    if(isMobile()){
      for(const [id,key] of Object.entries({journal:"mobile.journal",bag:"Inventory",pause:"Settings",interact:"mobile.interact",controls:"mobile.controls"}))updateText(id,t(key));
    }
    for(const control of document.querySelectorAll("[data-key]")){
      control.setAttribute("aria-label",t("mobile."+control.dataset.key));
    }
  }
  function language(next,view){
    locale=next;
    if(document.documentElement)document.documentElement.lang=next;
    controlLabels();
    render();if(view)view();
  }
  const languageButtons=view=>[button("繁體中文（香港）",()=>language("zh-HK",view),locale==="zh-HK"),button("English",()=>language("en",view),locale==="en")];
  function introduction(){
    show("Career Crossroads",[t("mission.story"),t("mission.do"),t("mission.ending")].join("\n\n"),[
      ...languageButtons(introduction),button("Start game",close),button("How to play",beginTutorial),button("Settings",()=>pause(true))
    ],"mission.title","briefing");
  }
  function beginTutorial(){
    if(tutorial<0)tutorialOrigin={area:game.area,x:game.x,y:game.y};
    Object.assign(game,{area:0,x:98,y:177});tutorial=0;close();
  }
  function exitTutorial(){
    Object.assign(game,tutorialOrigin);tutorialOrigin=null;tutorial=-1;close();
  }
  function pause(fromTitle=false){
    const back=fromTitle?introduction:close;
    const refresh=()=>pause(fromTitle);
    show("Paused","Two optional activities are available. Walking, reading and conversations are free. You can always finish the main story.",[
      button(fromTitle?"Back to title":"Resume",back),...languageButtons(refresh),
      button("Hints",()=>show("Hints",t(objective()[1])+"\n\n"+t(isMobile()?"mobile.hint":"hint.play"),[button("Settings",refresh)])),
      tutorial>=0?button("Skip tutorial",exitTutorial):button("Replay tutorial",beginTutorial),
      button("Restart week",()=>show("Start over?","Your current week and drafts will be cleared.",[button("Restart",replay),button("Cancel",refresh)]))
    ],"One Week to Graduation");
  }
  function tutorialInteract(id){
    if(tutorial<=1&&id==="email"){
      tutorial=2;
      return show("Tutorial","This is your phone. When you start the story, it holds the rejection email.",[button("Continue",close),button("Skip tutorial",exitTutorial)]);
    }
    if(tutorial===2&&id==="friend"){
      return show("Ming","Hey, you found me. In the story, talk to people and check documents before you settle on a route.",[button("Continue",()=>{
        tutorial=3;
        show("Tutorial",isMobile()?"mobile.tutorial.journal":"Open the journal with J or the Journal button.",[button("Back to the world",close),button("Skip tutorial",exitTutorial)]);
      })]);
    }
    if(tutorial===4&&id==="cv")return show("Tutorial complete","Two optional activities are available. Walking, reading and conversations are free. You can always finish the main story.",[button("Start game",exitTutorial)]);
    show("Tutorial",objective()[1],[button("Back to the world",close),button("Skip tutorial",exitTutorial)]);
  }
  function interact(object){
    if(!object||box.open)return;
    const [id]=object;
    if(tutorial>=0)return tutorialInteract(id);
    if(id in directions){
      game.area=directions[id];game.x=320;game.y=300;
      return show(areas[game.area].name,t("New area: ")+t(areas[game.area].name), [button("Explore",close)],"Location");
    }
    if(id==="ads"&&game.seen.has("ads"))return show("Vacancy board","requirements.note",[
      button("research.inspect",inspectVacancy),button(quests.explore.name,()=>sideQuest("explore")),button("Close",close)
    ],"Field notes");
    if(id in clues)return read(id);
    if(id in npc||id==="academic")return speak(id);
    if(id==="desk")return game.route?finalAction():sideQuest("build");
    if(id==="plan")return plan();
  }
  const fixtures=[[252,150,134,38],[140,214,62,25],[445,200,61,32]];
  const objects=()=>areas[game.area].objects;
  const distance=([,,x,y])=>Math.hypot(x-game.x,y-game.y);
  const nearest=()=>objects().filter(o=>distance(o)<44).sort((a,b)=>distance(a)-distance(b))[0];
  function free(x,y){
    return x>=28&&x<=612&&y>=61&&y<=329&&
      !fixtures.some(([a,b,w,h])=>x>a-9&&x<a+w+9&&y>b-9&&y<b+h+9)&&
      !objects().some(o=>!(o[0] in directions)&&Math.hypot(o[2]-x,o[3]-y)<17);
  }
  // Find a walkable approach so mouse input follows the same collision rules as keys.
  function approach(object){
    const queue=[{x:game.x,y:game.y,parent:null}], visited=new Set();
    for(let i=0;i<queue.length;i++){
      const node=queue[i];
      if(Math.hypot(node.x-object[2],node.y-object[3])<34){
        const path=[];
        for(let step=node;step.parent;step=step.parent)path.unshift(step);
        return path;
      }
      for(const [dx,dy] of [[8,0],[-8,0],[0,8],[0,-8]]){
        const x=node.x+dx,y=node.y+dy,key=x+","+y;
        if(!visited.has(key)&&free(x,y)){visited.add(key);queue.push({x,y,parent:node});}
      }
    }
    return [];
  }
  function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);}
  function portraitImage(id){
    const art=window.PIXEL_ART,palette=art.palettes[id];
    const pixels=art.front.slice(0,9).flatMap((row,y)=>[...row].map((cell,x)=>cell==="."?"":'<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="'+palette[cell]+'"/>')).join("");
    return 'url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 9" shape-rendering="crispEdges">'+pixels+'</svg>')+'")';
  }
  function sprite(x,y,id,step=0,direction="front"){
    const art=window.PIXEL_ART,palette=art.palettes[id],side=direction==="left"||direction==="right";
    const pixels=art[side?"side":direction];
    const idle=id==="player"&&!moving&&Math.floor(time/1100)%2===1?1:0;
    rect(x-11,y+8,22,5,"#27343a65");
    pixels.forEach((row,j)=>[...row].forEach((cell,i)=>{
      if(cell!==".")rect(x-12+(direction==="left"?11-i:i)*2,y-22+j*2+(j<11?idle:0)+(j>11?(i<6?step:-step):0),2,2,palette[cell]);
    }));
  }
  function scenery(area){
    for(let x=24;x<618;x+=32){
      for(let y=56;y<335;y+=24){
        if(area===0){
          rect(x+2,y+1,3,2,"#547957");rect(x+4,y+4,2,2,"#8dab72");
        }else{
          rect(x,y,30,1,area===1?"#8eaaad":"#bb916f");
          rect(x+(y%48?0:15),y,1,21,area===1?"#8eaaad":"#bb916f");
        }
      }
    }
  }
  function furniture(x,y,w,h,i,area){
    rect(x+3,y+8,w,h,"#28343d55");
    rect(x,y,w,h,["#44644f","#4c666f","#634343"][area]);
    rect(x+3,y+3,w-6,h-10,["#9aa779","#a9b5a9","#d3a273"][area]);
    if(area===0){
      for(let j=x+7;j<x+w-7;j+=13){
        rect(j,y+5,10,10,i===0?"#78925b":"#b98d61");
        rect(j+2,y+6,5,4,i===0?"#a9b773":"#d2a97f");
        if(i===0&&j%2)rect(j+3,y+8,3,3,"#f1c17e");
      }
    }else if(area===1){
      rect(x+9,y+5,21,14,"#334754");rect(x+11,y+7,17,9,"#a4ccd0");
      rect(x+14,y+19,12,3,"#65747b");rect(x+w-22,y+7,12,8,"#eee3bf");
    }else{
      for(let j=x+10;j<x+w-9;j+=25){
        rect(j,y+6,12,11,"#b67d58");rect(j+2,y+6,7,7,"#f5e1bb");rect(j+3,y+7,5,4,"#805549");
      }
      if(i===0){rect(x+4,y+h-12,w-8,5,"#77504a");rect(x+w-28,y+5,17,13,"#4b4d56");}
    }
  }
  function render(){
    const a=areas[game.area];
    rect(0,0,640,352,a.floor);
    scenery(game.area);
    rect(16,122,608,22,a.stripe);rect(16,267,608,24,a.stripe);
    rect(0,0,640,52,a.wall);rect(0,0,14,352,a.wall);rect(626,0,14,352,a.wall);rect(0,338,640,14,a.wall);
    for(const x of [23,609]){
      rect(x,38,11,8,game.area===0?"#9c7655":"#b27e61");
      rect(x-2,34,15,5,"#3a6852");rect(x+1,29,10,8,"#6c9b67");rect(x+5,28,4,4,"#8bb076");
    }
    for(let x=31;x<600;x+=75){
      rect(x,10,52,30,"#233d45");
      rect(x+4,13,44,22,game.area===0?"#eab36d":"#a8c5bd");
      if(game.area===0){
        rect(x+7,23,10,12,"#7e6768");rect(x+25,17,12,18,"#806a73");
        rect(x+28,21,2,3,"#f8d497");rect(x+33,26,2,3,"#f8d497");
      }else if(game.area===1){
        for(let j=8;j<44;j+=7)rect(x+j,19,4,13,j%3?"#456972":"#96645d");
      }else{
        rect(x+4,13,44,8,"#d79977");rect(x+9,29,35,5,"#75534d");
        rect(x+13,24,8,5,"#f8dfaa");rect(x+32,24,8,5,"#f8dfaa");
      }
    }
    fixtures.forEach(([x,y,w,h],i)=>furniture(x,y,w,h,i,game.area));
    ctx.font=(isMobile()?"700 20px ":"bold 12px ")+'"Microsoft JhengHei", "PingFang HK", sans-serif';ctx.textAlign="center";
    for(const [id,rawName,x,y,color] of objects()){
      const name=t(isMobile()&&window.MOBILE_COPY?.["mobile.map."+id]?"mobile.map."+id:rawName);
      if(color)sprite(x,y,id);
      else if(id in directions){rect(x-18,y-19,36,35,"#294c4c");rect(x-13,y-15,26,28,"#7fa898");}
      else{rect(x-12,y-10,24,20,"#34454d");rect(x-9,y-7,18,13,"#f5d7a0");rect(x-6,y-3,12,2,"#887654");}
      const width=ctx.measureText?ctx.measureText(name).width:name.length*(isMobile()?12:7);
      const labelX=Math.max(width/2+6,Math.min(634-width/2,x));
      rect(labelX-width/2-5,y+18,width+10,isMobile()?25:16,"#1a3038");
      ctx.fillStyle="#fff0d4";ctx.fillText(name,labelX,y+(isMobile()?38:30));
      if(objective()[0]===id){rect(x-5,y-30,10,10,"#ffc869");ctx.fillStyle="#263237";ctx.fillText("!",x,y-21);}
      else if((game.seen.has(id)||(id==="evidence"&&(has("survey")||has("brief"))))&&id in clues){rect(x-4,y-24,8,6,"#a2d0a3");rect(x-1,y-25,4,2,"#d7e9b8");}
    }
    sprite(game.x,game.y,"player",moving?Math.round(Math.sin(time/70)*2):0,facing);
    updateText("area",t(a.name));updateText("phase",t(tutorial>=0?"Tutorial":game.ending?"Reflection":phases[game.phase]));
    updateText("slots",t("Optional activities remaining: ")+game.slots+(locale==="zh-HK"?" 次":""));
    updateText("objective",t(objective()[1]));
    const nearby=nearest();
    if(nearby&&!box.open){
      const [, ,x,y]=nearby;
      if(isMobile()){
        rect(x-6,y-35,12,6,"#ffc869");rect(x-3,y-29,6,4,"#ffc869");
      }else{
        rect(x-9,y-48,18,15,"#18313b");ctx.fillStyle="#fff1ca";ctx.fillText("E",x,y-36);
      }
    }
    updateText("hint",nearby?(isMobile()?t("mobile.nearby"):"E · ")+t(nearby[1]):t(isMobile()?"mobile.hint":"Explore the marked objects or open your journal"));
  }
  function frame(now){
    const dt=Math.min((now-last)/1000,.035);last=now;time=now;moving=false;
    if(!box.open){
      let dx=Number(inputHeld("d")||inputHeld("arrowright"))-Number(inputHeld("a")||inputHeld("arrowleft"));
      let dy=Number(inputHeld("s")||inputHeld("arrowdown"))-Number(inputHeld("w")||inputHeld("arrowup"));
      if(dx||dy)target=null;
      if(target){
        if(distance(target)<37){const destination=target;target=null;interact(destination);}
        else{
          const next=waypoints[0];
          if(next){
            dx=next.x-game.x;dy=next.y-game.y;
            if(Math.hypot(dx,dy)<155*dt){game.x=next.x;game.y=next.y;waypoints.shift();dx=0;dy=0;}
          }else target=null;
        }
      }
      const length=Math.hypot(dx,dy);
      if(length){
        facing=Math.abs(dx)>Math.abs(dy)?(dx<0?"left":"right"):(dy<0?"back":"front");
        const x=game.x+dx/length*155*dt,y=game.y+dy/length*155*dt;
        if(free(x,game.y)){moving ||= x!==game.x;game.x=x;}
        if(free(game.x,y)){moving ||= y!==game.y;game.y=y;}
        if(moving&&tutorial===0)tutorial=1;
        if(!moving)target=null;
      }
    }
    render();requestAnimationFrame(frame);
  }
  map.onclick=event=>{
    const bounds=map.getBoundingClientRect();
    const x=(event.clientX-bounds.left)*640/bounds.width,y=(event.clientY-bounds.top)*352/bounds.height;
    const candidates=objects().filter(o=>Math.abs(o[2]-x)<38&&y-o[3]>-37&&y-o[3]<(isMobile()?45:37));
    if(isMobile())candidates.sort((a,b)=>Math.hypot(a[2]-x,a[3]-y)-Math.hypot(b[2]-x,b[3]-y));
    target=candidates[0]||null;
    waypoints=target?approach(target):[];
  };
  addEventListener("keydown",event=>{
    const key=event.key.toLowerCase();
    if(box.open)return;
    if(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(key)){keys.add(key);event.preventDefault();}
    if(!event.repeat&&key==="e")interact(nearest());
    if(!event.repeat&&key==="j")journal();
    if(!event.repeat&&key==="escape")pause();
  });
  addEventListener("keyup",event=>keys.delete(event.key.toLowerCase()));
  addEventListener("blur",()=>{keys.clear();touchKeys.clear();});
  for(const control of document.querySelectorAll("[data-key]")){
    const key=control.dataset.key;
    control.onpointerdown=event=>{
      if(box.open||event.button!==0)return;
      event.preventDefault();
      control.setPointerCapture?.(event.pointerId);
      touchKeys.set(event.pointerId,key);
    };
    const release=event=>touchKeys.delete(event.pointerId);
    control.onlostpointercapture=release;
    control.onpointercancel=release;
    control.onpointerup=release;
  }
  byId("journal").onclick=journal;byId("bag").onclick=inventory;byId("pause").onclick=()=>pause();
  byId("interact").onclick=()=>interact(nearest());
  phone?.addEventListener?.("change",controlLabels);
  language("zh-HK",introduction);requestAnimationFrame(frame);
})();
