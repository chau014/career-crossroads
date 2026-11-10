window.FINAL_COPY = Object.fromEntries(`
clue.objective|Find out what your dissertation shows. Check the folder or ask Ming or Dr Chan.|找出論文反映的能力。查看論文資料，或找阿明或陳老師。
clue.uncertain|You finished a dissertation. How might that experience help with an application?|你完成了畢業論文。這段經驗可以如何用於求職？
clue.inspect|Check the survey log and briefing|查看問卷紀錄和簡報
clue.friend|Ask Ming about the briefing|問阿明對簡報的印象
clue.academic|Review the survey log with Dr Chan|與陳老師核對問卷紀錄
clue.awarded|New clue: dissertation evidence|新線索：畢業論文的能力證據
clue.record|The survey log shows you checked inconsistent responses. You also rewrote the findings for student readers.|問卷紀錄顯示你核對過不一致的回覆。你亦為同學重寫了研究結果。
clue.use|Use this evidence at the CV workbench or in your final draft.|到履歷工作站或最後的草稿使用這項證據。
clue.ming|Ming opens the shared briefing. The contribution log confirms which parts you worked on.|阿明打開共用簡報。分工紀錄確認了你負責的部分。
clue.chan|Dr Chan asks what you changed. Together you check your survey log and briefing.|陳老師問你做過哪些修改。你們一起查閱問卷紀錄和簡報。
clue.compare|Check which duties match your survey checks and briefing work|核對哪些職責與核對問卷及整理簡報的經驗相符
clue.access|Include an example of rewriting findings for student readers|加入為同學重寫研究結果的例子
clue.research|Specify how you checked inconsistent survey responses|說明你如何核對不一致的問卷回覆
clue.career.community|Use your plain-language briefing as evidence. Check whether the paid role also requires direct service experience.|可用易明簡報作例子。亦要查看有薪職位是否要求直接服務經驗。
clue.career.research|Describe your data checks using the survey log. Ask which roles require independent interviews.|用問卷紀錄交代你如何核對資料，再問清楚哪些職位要求獨立訪談。
clue.career.access|Show how you revised the briefing. Check hours and supervision before committing.|展示你如何修改簡報。答應前先確認工時和督導安排。
Dr Chan|Dr Chan · Academic advisor|陳老師（學術導師）
academic.intro|What did you actually do for the dissertation? We can check the records together.|你在論文專題具體做過甚麼？我們可以一起查閱紀錄。
academic.follow|Use the survey log and briefing as examples of your own contribution.|可用問卷紀錄和簡報，說明你自己的貢獻。
Dissertation folder|Dissertation folder|論文資料
Settings|Settings|設定
Back to title|Back to title|返回標題畫面
Hints|Hints|提示
hint.play|Follow the gold marker. Walk near the target and press E, or click it.|跟隨金色標記。走近目標後按 E，或直接點擊。
ending.header|You have reached one of the possible endings.|你已到達其中一個結局
View Ending Summary|View Ending Summary|查看結局摘要
Continue to Reflection|Continue to Reflection|進入反思
Play Again|Play Again|再玩一次
ending.block|Original obstacle: |原本的阻礙：
ending.rejection|Your graduate job application was rejected.|畢業生職位申請落選。
`.trim().split("\n").map(line=>{const [key,en,zh]=line.split("|");return [key,[en,zh]];}));
window.FINAL_COPY["reflection.final"]=[
"1. What blocked your original plan?\n\n2. How did you find another possible route?\n\n3. Who helped you in the game? Who could you ask for help in real life?\n\n4. What could you apply to your own career plan?\n\nDiscuss your game experience with your group and use the workbook to update your career action plan. Bring your Strengths Evidence Card, Hope Map and Career Quest Record.",
"1. 原本的計劃遇到甚麼阻礙？\n\n2. 你怎樣找到其他可行的方法？\n\n3. 遊戲中有誰幫助你？現實中你可以向誰求助？\n\n4. 你可以將哪個做法應用到自己的職涯計劃？\n\n請與組員討論你的遊戲經歷，並參考工作冊更新自己的職涯行動計劃。討論時可參考優勢證據卡、希望地圖和職涯任務紀錄。"
];
