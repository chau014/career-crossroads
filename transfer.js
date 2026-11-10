window.TRANSFER_COPY=Object.fromEntries(`
mission.title|Mission briefing|任務簡介
mission.story|One week before graduation, a rejection email leaves your community-service plan up in the air.|距離畢業還有一星期，一封落選電郵打亂了你投身社區服務的計劃。
mission.do|Investigate what your experience shows, explore career routes and seek support if useful. When an obstacle appears, decide what to do and complete one practical action.|調查自己的經歷可以證明甚麼、探索職涯路徑，並按需要求助。遇到阻礙時，決定如何應對，再完成一項可行的行動。
mission.ending|Your decisions lead to different directions. There is no single correct ending. Take your Career Action Summary into the workshop discussion.|你的選擇會帶出不同方向，結局沒有標準答案。完成後，帶同職涯行動結算參與工作坊討論。
end.community.sub|The goal stays. The route changes.|目標不變，路徑可以調整
end.community.scene|You close the original application and keep the community-service goal in view. On the way across campus, you keep your new draft handy for the next search.|你合上原本的申請資料，仍希望投身社區服務。離開校園時，你帶着新草稿，準備下一次搜尋。
end.community.ask|Which part of the goal still matters when a particular vacancy is out of reach?|當某個職位不再可行，這個目標仍有哪些地方對你重要？
end.research.sub|A nearby route uses different experience.|相近的路徑可用到不同經驗
end.research.scene|At the café, you set the research lead beside your draft. Independent interviewing is a requirement to check. Paid evaluation support gives you a related route to investigate.|你在咖啡室把研究職位線索與草稿放在一起。你還要確認獨立訪談的要求，也可以了解相關的有薪評估支援職位。
end.research.ask|What could a related role let you practise while you check the interviewing requirement?|查清楚訪談要求期間，相關職位可以讓你練習哪些能力？
end.access.sub|A workable week matters, too.|一份配合生活安排的工作也很重要
end.access.scene|You open your weekly calendar beside the communications lead. Making public information easier to understand feels meaningful. You leave room to check shifts against your existing commitments.|你打開每週行事曆，對照傳訊職位線索。讓公共資訊更易明對你有意義，你也預留時間核對更表能否配合現有責任。
end.access.ask|Which responsibilities would you keep in view when reconsidering a career goal?|重新考慮職涯目標時，你會把哪些責任和生活安排納入考慮？
summary.title|Career Action Summary|職涯行動結算
summary.ending|Ending reached|已到達的結局
summary.original|Original goal|原本的目標
summary.setback|Main setback|主要阻礙
summary.evidence|Evidence and resources found|找到的證據及資源
summary.people|People consulted and support received|曾交談的人及獲得的支援
summary.first|Pathway first considered|最初考慮的路徑
summary.revised|Revised pathway or direction|調整後的路徑或方向
summary.action|Action you completed|已完成的行動
summary.uncertain|What is still uncertain|仍未確定的事
summary.next|One realistic next step|一個可行的下一步
summary.none|None recorded in this run.|這一局沒有相關紀錄。
summary.copy|Copy summary|複製結算
summary.save|Save text file|儲存文字檔
summary.print|Print / save PDF|列印／儲存 PDF
summary.copied|Summary copied.|已複製結算。
summary.manual|Select the text below and copy it, or save a text file.|請選取並複製下方文字，或儲存文字檔。
summary.clarify|Before applying, send the drafted enquiry if you still want to check what counts as interview experience.|如仍想確認哪些經驗符合訪談要求，可在申請前發出草擬的查詢。
summary.related|Check the duties, hours and application date of one paid evaluation support vacancy.|查看一個有薪評估支援職位的職責、工時及申請日期。
summary.support|Check when the free CV service is available and bring your draft.|查詢免費履歷支援的時間，並帶同草稿。
summary.cautious|Use your drafted question to check one requirement in the advert or with the employer.|用草擬的問題，在廣告中查證一項要求，或向僱主查詢。
group.title|Group Discussion|帶入小組討論
group.subtitle|Use your Career Action Summary to discuss these three questions with your group.|參考你的職涯行動結算，與組員分享以下三個問題。
group.1|How did your plan change?|你的計劃如何改變？
group.2|What helped you decide?|甚麼幫助你作出決定？
group.hint|Evidence of your skills or advice from others|能力證據或他人建議
group.3|What could you use in real life?|你可以將甚麼方法用於現實？
group.example|For example, check one job requirement before applying.|例如：申請前查清楚一項職位要求。
group.workbook|After the discussion, update your Hope Map and Revised Career Action Plan.|討論後，更新你的 Hope Map 和 Revised Career Action Plan。
event.evidence|Evidence found|找到證據
event.support|Support received|獲得支援
event.blocked|Pathway blocked|路徑受阻
event.route|Pathway revised|已調整路徑
event.action|Action completed|已完成行動
event.ending|Ending reached|已到達結局
event.next|Next step|下一步
event.why|Why it matters|為甚麼重要
event.unknown|What is still uncertain|仍未確定的事
event.use|Check the inventory. At the workbench, choose a claim supported by your evidence.|查看物品欄。到履歷工作站時，選擇有證據支持的說法。
event.lead|Visit the café vacancy board to check the requirements and hours.|到招聘咖啡室的職位告示板確認要求和工時。
event.revise|Return to the planning table to compare alternatives.|返回規劃桌比較其他路徑。
event.workbench|At the Career Centre workbench, choose and complete one draft action for this direction.|到職涯中心的履歷工作站，為這個方向選擇並完成一項草稿行動。
event.research|This listing is blocked unless you can meet its independent interviewing requirement.|除非符合獨立訪談要求，否則這個職位暫不可行。
event.access|The shift pattern is still unconfirmed. Check whether it fits your responsibilities.|更表仍未確認。先查看能否配合你現有的責任。
`.trim().split("\n").map(line=>{const [key,en,zh]=line.split("|");return [key,[en.replaceAll("\\n","\n"),zh.replaceAll("\\n","\n")]];}));

