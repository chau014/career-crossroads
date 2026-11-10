window.DEPTH_COPY=Object.fromEntries(`survey|Survey log|問卷核對紀錄
brief|Briefing draft|簡報草稿
record|Contribution record|小組分工紀錄
feedback|Dr Chan’s feedback|陳老師的意見
requirements|Vacancy requirements|職位要求
lead|Yan’s role comparison|Yan 的職位比較
survey.note|The log records discrepancies you checked. It does not show that you conducted interviews.|紀錄列出你核對過的不一致回覆，未能證明你曾做訪談。
brief.note|The draft shows a plain-language rewrite. Check who wrote it before claiming it as your own work.|草稿有一段易明的改寫。用作個人例子前，要先確認是誰寫的。
record.note|Ming shows the group’s contribution record. It credits you with rewriting the findings for students.|阿明找出小組分工紀錄，確認你負責為同學改寫研究結果。
feedback.note|Dr Chan suggests naming the data checks you carried out and what they helped resolve. The log cannot establish independent interviewing experience.|陳老師建議你交代做過哪些資料核對，以及解決了甚麼問題。這份紀錄不能證明你有獨立訪談經驗。
requirements.note|Research assistant: independent interviews. Evaluation support: survey checks and summaries. Outreach support: explain information clearly and check the hours.|研究助理：需獨立訪談。評估支援：核對問卷及整理摘要。外展支援：清楚解說資訊，並要查詢工時。
lead.note|Compare paid evaluation support, which uses data checks, with paid outreach support, which uses clear communication. Confirm the actual duties and hours with each employer.|比較兩類有薪工作：評估支援會用到資料核對，外展支援則重視清楚解說。實際職責和工時要向僱主確認。
lead.prompt|Compare two paid entry routes|比較兩條有薪入行路徑
chan.prompt|Ask about data checks|詢問資料核對的經驗
chan.brief|Ask how to use the briefing draft|詢問如何使用簡報草稿
chan.brief.note|Dr Chan suggests checking the contribution record before claiming the rewrite. The draft alone does not identify the author.|陳老師建議先查閱分工紀錄。單看草稿，無法知道改寫部分是誰負責的。
mentor.note|My first job involved scheduling, then I moved toward evaluation. Compare paid support roles and ask what training is actually offered.|我第一份工主要負責安排日程，之後才轉做評估。可以比較有薪支援職位，問清楚實際提供甚麼培訓。
mentor.access|Before you take a communications project, ask about hours and who reviews your drafts. A short contract can be hard to fit around paid work.|接傳訊項目前，先問清楚工時和誰會審閱草稿。短期合約也可能和兼職撞期。
recruiter.note|Data checking helps in support roles. This particular assistant vacancy still lists independent interviewing.|資料核對對支援工作有用，但這個助理職位仍列明需要獨立訪談。
recruiter.access|The communications project has not confirmed its shifts. A briefing sample can show your writing, but it cannot settle the schedule.|傳訊項目的更表還未確定。簡報可展示寫作能力，但不能解決工時問題。
research.inspect|Check the full research vacancy|查看研究職位的詳細要求
research.gap|The detailed advert confirms that independent interviewing is required. Survey checks may fit paid evaluation support, but they do not meet this requirement on their own.|詳細廣告確認必須有獨立訪談經驗。核對問卷可能適合有薪評估支援，但單靠這項經驗不符合這個職位要求。
research.clarify|Draft a question about what counts as interview experience|草擬問題，查詢哪些經驗算作訪談經驗
research.related|Compare a paid evaluation support role instead|改為比較有薪評估支援職位
research.switch|Revisit all pathways|重新考慮所有路徑
research.clarify.note|You keep research in view while checking the requirement. The enquiry is a draft and a reply is uncertain.|你保留研究方向，先確認要求。查詢只是草稿，未必會收到回覆。
research.related.note|You switch to a paid support role that uses survey checking. Its duties and availability still need checking.|你轉向可用到問卷核對經驗的有薪支援職位。仍要確認職責和空缺情況。
decision.prompt|Choose one approach to put in the draft. You can review the evidence before committing.|選一個做法放入草稿。確認前可重新查看證據。
decision.research|Describe the survey discrepancies you checked|交代你核對過哪些不一致的問卷回覆
decision.research.coached|Describe the survey discrepancies and explain what checking them resolved|交代你核對過哪些不一致的回覆，以及解決了甚麼問題
decision.communication|Use the briefing rewrite as evidence of clear communication|用簡報改寫展示清楚解說的能力
decision.cautious|Write one question to check the role requirements before applying|先寫一條問題，確認職位要求再申請
decision.survey.missing|Check the survey log first. It gives you a concrete example to describe.|先查看問卷核對紀錄，找一個可具體描述的例子。
decision.communication.missing|Find both the briefing draft and Ming’s contribution record to show what you personally rewrote.|找出簡報草稿和阿明的分工紀錄，確認哪些部分是你改寫的。
decision.compare|Compare the two roles by the work they actually ask you to do|按兩個職位的實際職責作比較
decision.hours|Compare the roles by confirmed hours and note what is still unclear|比較兩個職位已確認的工時，並記下仍未確定的地方
decision.entry|Ask which requirements are essential for a paid entry role|查詢有薪入行職位有哪些必要要求
decision.support|Ask where to find free CV support before applying|查詢申請前可在哪裏獲得免費履歷支援
decision.review|Review the draft|查看草稿
decision.revise|Choose a different approach|改用另一個做法
decision.save|Finish draft|完成草稿
decision.unconfirmed|Keep the evidence as a question to verify before making a claim.|先把未確認的證據列為待查問題。
decision.data.fit|The vacancy details show where survey checks are relevant and where interviews are still required.|職位詳情顯示哪些職責用到問卷核對，以及哪些仍要求訪談經驗。
decision.communication.fit|The draft shows the rewrite and the contribution record credits you with it.|草稿顯示改寫內容，分工紀錄確認了你的貢獻。`.split("\n").map(line=>{const [key,en,zh]=line.split("|");return [key,[en,zh]];}));
