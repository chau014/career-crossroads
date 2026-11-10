window.RESULT_COPY=Object.fromEntries(`
result.title|Activity Result|行動結果
result.what|Completed|已完成
result.output|Result|所得結果
result.effect|What this changes|這代表甚麼
result.unknown|Still uncertain|仍未確定
result.next|Next step|下一步
result.saved|Saved to your Career Action Summary.|結果已記入職涯行動結算。
result.reopen|Reopen result|重看行動結果
result.research|Research assistant|研究助理
result.community|Community support|社區支援
result.research.fact|The listing requires independent interviewing.|職位列明須有獨立訪談經驗。
result.community.fact|Outreach support can involve coordinating programmes and answering public enquiries.|外展支援可涉及統籌項目和回覆市民查詢。
result.compare|The roles ask for different experience. Compare your evidence against each requirement.|兩類工作要求不同。可用手上的證據逐項對照。
result.hours|Working hours are unconfirmed. Neither route can be ruled in on schedule alone.|工時仍未確認，暫時不能單憑時間判斷哪條路可行。
result.fit.survey|Your survey checks are relevant to evaluation support. They do not establish independent interviewing experience.|你核對問卷的經驗適用於評估支援，但不能證明你曾獨立訪談。
result.fit.brief|Your verified briefing rewrite gives you a concrete communication example for outreach support.|已核實的簡報改寫可作外展支援的溝通例子。
result.fit.none|The available evidence is insufficient to decide which role fits better.|目前證據不足，未能判斷哪類職位較適合。
result.compare.unknown|Eligibility and specific hours remain unconfirmed.|資格是否符合及實際工時仍待確認。
result.compare.next|Clarify the requirements and hours, or compare a paid evaluation support role.|查詢要求和工時，或比較有薪評估支援職位。
result.before|Before|修改前
result.after|After|修改後
result.cv.old|Helped with a university research project.|協助大學研究專題。
result.cv.survey|Checked inconsistent responses in the dissertation survey log.|核對畢業論文問卷紀錄中不一致的回覆。
result.cv.coached|Reviewed the dissertation survey log to identify responses that needed checking.|查閱畢業論文問卷紀錄，找出需要核對的回覆。
result.cv.brief|Rewrote the dissertation findings in plain language for student readers.|以淺白文字為同學改寫畢業論文的研究結果。
result.cv.effect|You now have a specific statement you can reuse in your final draft.|你現在有一句具體的履歷描述，可用於最後的草稿。
result.cv.unknown|Employer acceptance and any interviewing requirement still need checking.|僱主是否接納這項經驗及是否要求訪談，仍要確認。
result.cv.next|Match the new statement to one requirement in the role you are considering.|用新句子對照目標職位的一項要求。
result.cv.check|Drafted a question to verify what experience the role accepts. The original CV line is still a draft.|已草擬問題，查詢職位接納哪些經驗。原有履歷句子仍待修改。
result.cv.check.effect|You have a way to check the requirement before making a claim.|你可以先查清要求，再決定履歷應怎樣寫。
result.cv.check.next|Use the question to check the advert or ask the employer.|用這個問題查閱招聘廣告，或向僱主查詢。
result.connect.entry|Yan pointed you towards paid outreach support. Programme coordination and answering public enquiries are duties to check.|Yan 建議你了解有薪外展支援，可先查詢統籌項目及回覆市民查詢等職責。
result.connect.support|Yan pointed you to the Career Centre resource board for free CV support.|Yan 建議你到職涯中心資源告示板查詢免費履歷支援。
result.connect.entry.effect|You can include the outreach lead in your final draft if you pursue community work.|如選擇社區工作，可把這個外展線索加入最後草稿。
result.connect.support.effect|You can use the CV support enquiry as your final draft action.|你可以把查詢履歷支援用作最後的草稿行動。
result.connect.entry.unknown|No employer has confirmed eligibility, duties or hours.|僱主尚未確認資格是否符合、實際職責或工時。
result.connect.support.unknown|Appointment times and availability are unconfirmed.|諮詢時間及名額仍待確認。
result.connect.entry.next|Check a paid outreach advert for essential requirements and hours.|查看有薪外展職位的必要要求和工時。
result.connect.support.next|Check the next available CV support session and bring your draft.|查詢下一次可用的履歷支援時段，並帶同草稿。
summary.results|Completed optional activities|已完成的額外活動
summary.plan|Pathway comparison|路徑比較
`.trim().split("\n").map(line=>{const [key,en,zh]=line.split("|");return [key,[en,zh]];}));

window.RESULT_COPY["result.comparison"]=["Role comparison result","職位比較結果"];
window.RESULT_COPY["decision.hours"]=["Check which working hours are known and which still need confirming","查看哪些工時資料已知，哪些仍待確認"];

Object.assign(window.RESULT_COPY,Object.fromEntries(`syn.path|Career pathway|職涯路徑
syn.resources|Resources gained|獲得的資源
syn.steps|Completed action and next step|已完成行動與下一步
syn.jobs|Job information|職位資訊
syn.constraint|Alternative route constraint|其他路徑的限制
syn.uncertainty|Remaining uncertainty|仍未確定
syn.stop.community|The community trainee vacancy closed.|社區見習職位已截止申請。
syn.stop.research|The research vacancy requires independent interviewing.|研究職位要求獨立訪談經驗。
syn.stop.access|Possible daytime shifts may clash with existing paid work.|日間更份可能與現有兼職撞期。
syn.research.unknown|Employer acceptance of your experience remains unclear.|僱主是否接納你的經驗仍未確定。
syn.hours.unknown|Actual shifts still need confirming.|實際更表仍待確認。
syn.research.role|Research: independent interviewing required.|研究職位：要求獨立訪談經驗。
syn.community.role|Outreach: programme coordination and public enquiries.|外展支援：統籌項目及回覆市民查詢。
syn.data|Data checking: the survey log records your checks.|資料核對：問卷紀錄列出你做過的核對。
syn.communication|Communication: the draft and contribution record confirm your rewrite.|溝通：草稿和分工紀錄確認你負責改寫。
syn.resources.board|Career Centre: free CV support is listed.|職涯中心：告示板列出免費履歷支援。
syn.friend.record|Confirmed your briefing contribution.|確認你在簡報中的貢獻。
syn.friend.brief|Recalled how students used the briefing.|提起同學如何使用簡報。
syn.friend.first|Shared a similar rejection experience.|分享自己落選的經歷。
syn.academic.feedback|Reviewed your survey evidence and its limits.|檢視你的問卷證據及其限制。
syn.academic.brief|Suggested checking who wrote the briefing.|建議查清簡報由誰改寫。
syn.academic.first|Offered to review your dissertation records.|提出一起查閱論文紀錄。
syn.advisor.lead|Compared paid evaluation and outreach routes.|比較有薪評估支援與外展路徑。
syn.advisor.advice|Linked your evidence to a possible route.|指出你的證據可用於哪條路徑。
syn.advisor.first|Suggested checking the application and vacancies.|建議查閱申請資料及職位資訊。
syn.advisor.connect|Pointed you to a resource in the Connect activity.|在連繫活動提供了可跟進的資源。
syn.mentor.route|Shared a route from operations into evaluation.|分享由營運轉到評估工作的經歷。
syn.mentor.hours|Suggested checking hours and supervision.|建議查詢工時及督導安排。
syn.recruiter.interview|Explained the interviewing requirement.|解釋訪談經驗要求。
syn.recruiter.hours|Flagged unconfirmed shifts.|提醒更表尚未確認。
syn.recruiter.lead|Pointed to paid evaluation support roles.|指出可留意有薪評估支援職位。
syn.activity.explore|Research requires independent interviews; outreach centres on coordination and enquiries. Hours remain unconfirmed.|研究職位要求獨立訪談；外展支援着重統籌及回覆查詢。工時尚未確認。
syn.activity.build|Revised CV line|修訂後的履歷句子
syn.activity.buildcheck|Drafted a question to check what experience the role accepts.|草擬了問題，查詢職位接納哪些經驗。
syn.activity.connect.entry|Identified paid outreach support as a route to check.|找到有薪外展支援這條可跟進的路徑。
syn.activity.connect.support|Found where to ask about free CV support.|找到可查詢免費履歷支援的地方。
syn.action.data|Drafted a statement about your survey checks.|草擬了交代問卷核對經驗的句子。
syn.action.communication|Drafted a statement about your briefing rewrite.|草擬了交代簡報改寫經驗的句子。
syn.action.cautious|Drafted a question to verify a role requirement.|草擬了確認職位要求的問題。
syn.action.clarify|Drafted a question about what counts as interview experience.|草擬了查詢哪些經驗算作訪談經驗的問題。
syn.action.related|Drafted a comparison with paid evaluation support.|草擬了與有薪評估支援職位的比較。
syn.action.support|Drafted an enquiry about free CV support.|草擬了查詢免費履歷支援的訊息。
syn.action.outreach|Added the paid outreach lead to your draft.|把有薪外展線索加入草稿。
syn.action.hours|Added the working-hours comparison to your draft.|把工時比較加入草稿。
syn.next.community|Check the duties and hours of one paid community support role.|查詢一個有薪社區支援職位的職責和工時。
syn.next.research|Check which skills one paid evaluation support role requires.|查看一個有薪評估支援職位所需的技能。
syn.next.access|Ask whether one communications role fits your schedule.|查詢一個傳訊職位的工時能否配合你的安排。`.split("\n").map(line=>{
  const [key,en,zh]=line.split("|");
  return [key,[en,zh]];
})));
