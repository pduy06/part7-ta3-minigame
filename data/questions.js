/**
 * TOEIC Part 7 Questions Data - dong bo theo noi dung chot:
 * Q1 = Q149 (Lorene), Q2 = Q159 (Channel 19)
 * Q3/Q5 chua chot (giu vi tri, se them sau), Q4 BO, khong Q166/Q157.
 */

export const questionsData = [
  {
    id: "demo",
    order: 0,
    type: "form",
    question: "Who is still waiting for everyone to finish?",
    media: {
      kind: "table",
      tableData: {
        columns: ["Member", "Assigned Task", "Status"],
        rows: [
          ["Member 1", "Introduction & Overview", "Done"],
          ["Member 2", "Vocabulary in Context", "Done"],
          ["Member 3", "Single Passage Strategies", "Done"],
          ["Member 4", "Charts & Forms Mastery", "Done"],
          ["Member 5", "Practice Drills & Analysis", "Almost done"],
          ["Member 6", "Final Deck Review", "Waiting for everyone"],
          ["Member 7", "\"I can help with anything\"", "No update yet"]
        ]
      }
    },
    answers: [
      { id: "A", text: "Member 3" },
      { id: "B", text: "Member 4" },
      { id: "C", text: "Member 6" },
      { id: "D", text: "Member 7" }
    ],
    correctAnswerId: "C",
    timing: {
      questionTimerSeconds: 5,
      scanTimerSeconds: 20,
      answerTimerSeconds: 10
    },
    evidence: {
      mode: "table_cells",
      chain: [
        { step: 1, row: 5, col: 0, label: "Hàng: Member 6" },
        { step: 2, row: 5, col: 1, label: "Cột: Final Deck Review" },
        { step: 3, row: 5, col: 2, label: "Dữ kiện: Waiting for everyone" }
      ]
    },
    why: "Member 6 có Status ghi rõ 'Waiting for everyone'."
  },
  {
    id: "q1",
    order: 1,
    type: "form",
    question: "What can be reimbursed using the form?",
    media: {
      kind: "table",
      imageUrl: null,
      formHeader: {
        title: "Lorene Industries",
        subtitle: "Reimbursement Request Form",
        meta: "Name: Timothy Oswell<br>Supervisor's name: Laura Cho<br>Department: Advertising<br>ID: 8123976<br>Position: Project manager",
        section: "Itemized expenses:"
      },
      tableData: {
        columns: ["Date", "Description", "Cost"],
        rows: [
          ["28/1", "Travel to meeting", "£3"],
          ["28/1", "Lunch with Yannick Le Mignon, Mazzira Group", "£55"],
          ["28/1", "Return travel to office", "£3"],
          ["", "Total reimbursement", "£61"]
        ],
        footnote: "Funds will not be issued to employees without itemized receipts.<br><br>Credits for claimed reimbursements will be added to the employee's regular biweekly paycheck.<br><br>Amounts over £100 will not be processed during the current pay period. Instead, they will be reimbursed at the end of the following quarter.<br><br>Employee signature: Timothy Oswell<br>Supervisor signature: Laura Cho<br>Form received date: 30/1<br>Receipts attached? Yes<br>Finance department reimbursement officer approval: Tia Jegerfalk"
      }
    },
    answers: [
      { id: "A", text: "Only amounts less than £100" },
      { id: "B", text: "Only transportation costs" },
      { id: "C", text: "Only charges submitted with a receipt" },
      { id: "D", text: "Only the expenses of senior staff members" }
    ],
    correctAnswerId: "C",
    timing: {
      questionTimerSeconds: 5,
      scanTimerSeconds: 20,
      answerTimerSeconds: 10
    },
    evidence: {
      mode: "image_keys",
      chain: [
        { step: 1, key: "without itemized receipts", label: "Funds will not be issued to employees without itemized receipts." }
      ]
    },
    why: "Theo quy định của biểu mẫu, khoản hoàn trả chỉ được cấp khi nhân viên nộp biên lai chi tiết. Vì vậy, đáp án đúng là C.",
    skill: "Scan → Find policy → Match evidence"
  },
  {
    id: "q2",
    order: 2,
    type: "chart",
    question: "What is the focus of the channel?",
    media: {
      kind: "image",
      imageUrl: "./assets/q3-channel19-schedule.png",
      tableData: null
    },
    answers: [
      { id: "A", text: "Food" },
      { id: "B", text: "Sports" },
      { id: "C", text: "Nature" },
      { id: "D", text: "Children" }
    ],
    correctAnswerId: "C",
    timing: {
      questionTimerSeconds: 5,
      scanTimerSeconds: 20,
      answerTimerSeconds: 10
    },
    evidence: {
      mode: "image_keys",
      chain: [
        { step: 1, key: "Life in Alaska", label: "Life in Alaska" },
        { step: 2, key: "Amazing Sights of Africa", label: "Amazing Sights of Africa" },
        { step: 3, key: "Anatomy of a Dinosaur", label: "Anatomy of a Dinosaur" },
        { step: 4, key: "Rocky", label: "Rocky" },
        { step: 5, key: "Natural Phenomenon", label: "Natural Phenomenon" },
        { step: 6, key: "Blue Ocean", label: "Blue Ocean" }
      ]
    },
    why: "Nhìn tổng thể lịch chương trình, các nội dung chủ yếu nói về động vật, thực vật, thiên nhiên, môi trường và hoạt động ngoài trời. Vì vậy, chủ đề chính của kênh là Nature.",
    skill: "Overview Scan → Identify the common topic"
  }
];
