// Original fictional story and map data. Coordinates are in canvas pixels.
window.CROSSROADS = {
  areas: [
    {name:"University Campus", floor:"#70906b", stripe:"#b8aa82", wall:"#425b50", objects:[
      ["email","Phone",99,99],["cv","Application",225,88],["friend","Ming",380,111,"#a75658"],["evidence","Dissertation folder",517,87],["academic","Dr Chan",480,175,"#7a5248"],
      ["centre","Career Centre",575,242],["cafe","Recruitment Cafe",65,242]]},
    {name:"Career Centre",floor:"#67878b",stripe:"#adbfaa",wall:"#3d575c",objects:[
      ["advisor","Yan (Advisor)",164,105,"#645eaa"],["board","Resources board",325,91],["desk","CV workbench",491,102],
      ["campus","Campus",65,242],["cafe","Recruitment Cafe",575,242]]},
    {name:"Recruitment Cafe",floor:"#a87c63",stripe:"#d8b78b",wall:"#694d52",objects:[
      ["mentor","Jo (Graduate)",129,111,"#406f86"],["ads","Vacancy board",273,87],["recruiter","Leung (Recruiter)",480,105,"#45785e"],
      ["plan","Planning table",320,251],["campus","Campus",65,242],["centre","Career Centre",575,242]]}
  ],
  directions:{campus:0,centre:1,cafe:2},
  routes:{
    community:{name:"Community programme work",goal:"Make local services easier to access",setback:"The paid community trainee advert closed this morning. The deadline is confirmed. Future openings are unknown.",main:"Compare paid outreach and programme support roles",alt:"Look for related roles in university or public services",next:"Compare two current adverts during a 20-minute search",unknown:"Whether suitable vacancies reopen and how competitive they will be",ending:"Revised Route, Same Goal"},
    research:{name:"Service research",goal:"Use evidence to improve local services",setback:"The research assistant post asks for independent interviewing. The class project shows survey work, but the employer has not confirmed that it meets the requirement.",main:"Target paid evaluation or research support roles",alt:"Use a community support role to learn how services gather feedback",next:"Check one paid evaluation advert for required and preferred skills",unknown:"How individual employers weigh coursework and experience",ending:"Related Alternative"},
    access:{name:"Accessible public communication",goal:"Help people understand and use public information",setback:"The short communications project may need daytime shifts that clash with existing paid work. The schedule is still unconfirmed.",main:"Compare paid communications roles with workable hours",alt:"Look for accessible content tasks within community programme roles",next:"Ask about hours before committing to an opportunity",unknown:"Which roles offer compatible hours and useful supervision",ending:"Reconsidered Direction"}
  }
};

