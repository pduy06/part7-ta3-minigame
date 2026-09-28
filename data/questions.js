/**
 * TOEIC Part 7 Questions Data
 * Minimal, concise data-driven schema.
 * Question 0: Demo / Practice
 * Questions 1 - 5: Main Questions
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
    question: "How much does an Avalanche fuel canister cost?",
    media: {
      kind: "image",
      imageUrl: "./assets/q1-maple-outdoor.png",
      tableData: null
    },
    answers: [
      { id: "A", text: "$58.79" },
      { id: "B", text: "$9.98" },
      { id: "C", text: "$19.96" },
      { id: "D", text: "$12.85" }
    ],
    correctAnswerId: "B",
    timing: {
      questionTimerSeconds: 5,
      scanTimerSeconds: 20,
      answerTimerSeconds: 10
    },
    evidence: {
      mode: "image_keys",
      chain: [
        { step: 1, key: "Fuel Canister", label: "Find the row: Fuel Canister" },
        { step: 2, key: "Avalanche", label: "Check the brand: Avalanche" },
        { step: 3, key: "UNIT PRICE", label: "Check the column: UNIT PRICE" },
        { step: 4, key: "$9.98", label: "→ $9.98" }
      ]
    },
    why: "Fuel Canister → Avalanche → UNIT PRICE → $9.98.",
    distractor: "$19.96 appears in the PRICE column, not the UNIT PRICE column.",
    skill: "SCAN → FIND ROW → CHECK COLUMN → FIND DATA"
  },
  {
    id: "q2",
    order: 2,
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
    why: "Funds will not be issued to employees without itemized receipts.",
    skill: "SCAN form → policy/receipt section"
  },
  {
    id: "q3",
    order: 3,
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
        { step: 1, key: "nature, wildlife, the outdoors", label: "The programs mainly focus on nature, wildlife, the outdoors, and the natural world." }
      ]
    },
    why: "The programs on the schedule mainly focus on nature, wildlife, the outdoors, and the natural world.",
    skill: "Overview Scan — titles + programs for general topic, not line-by-line"
  },
  {
    // TODO(Q166): chua chot dap an - doi anh document de doi chieu Ms. Sullivan + March 13. Hien de tam D.
    id: "q4",
    order: 4,
    type: "form",
    question: "What did Ms. Sullivan do on March 13?",
    media: {
      kind: "image",
      imageUrl: "./assets/q4-ms-sullivan.png",
      tableData: null
    },
    answers: [
      { id: "A", text: "Purchased a home security system" },
      { id: "B", text: "Returned a product" },
      { id: "C", text: "Signed up for Internet service" },
      { id: "D", text: "Made an appointment" }
    ],
    correctAnswerId: "D",
    timing: {
      questionTimerSeconds: 5,
      scanTimerSeconds: 20,
      answerTimerSeconds: 10
    },
    evidence: {
      mode: "image_keys",
      chain: [
        { step: 1, key: "Ms. Sullivan", label: "SCAN name: Ms. Sullivan" },
        { step: 2, key: "March 13", label: "SCAN date: March 13" },
        { step: 3, key: "action", label: "Đối chiếu hành động tương ứng trong document (TODO theo ảnh)" }
      ]
    },
    why: "TODO: cập nhật giải thích ngắn + underline đỏ theo ảnh gốc (Ms. Sullivan + March 13).",
    skill: "SCAN name + date → match action"
  },
  {
    id: "q5",
    order: 5,
    type: "chart",
    question: "Why might rates be raised by the postal service in the future?",
    media: {
      kind: "image",
      imageUrl: "./assets/5-postal-rates.png",
      tableData: null
    },
    longSentenceBackup: {
      text: "Any future price adjustments will be based on national inflation.",
      segments: [
        {
          text: "Any future price adjustments will be based on",
          role: "subject",
          label: "Mệnh đề chính"
        },
        {
          text: "national inflation.",
          role: "main_verb",
          label: "Paraphrase: changes in inflation"
        }
      ]
    },
    answers: [
      { id: "A", text: "To cover expenses related to an expansion" },
      { id: "B", text: "To adjust for changes in inflation" },
      { id: "C", text: "To pay for additional staff members" },
      { id: "D", text: "To allow for mail heavier than 30 grams" }
    ],
    correctAnswerId: "B",
    timing: {
      questionTimerSeconds: 5,
      scanTimerSeconds: 20,
      answerTimerSeconds: 10
    },
    evidence: {
      mode: "image_keys",
      chain: [
        { step: 1, key: "national inflation", label: "Any future price adjustments will be based on national inflation." }
      ]
    },
    why: "Any future price adjustments will be based on national inflation.",
    paraphrase: "national inflation → changes in inflation",
    skill: "Scan → Locate Evidence → Recognize Paraphrase"
  }
];
