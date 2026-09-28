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
    id: "q4",
    order: 4,
    type: "long_sentence",
    question: "According to the sentence, why was the official building inspection postponed?",
    longSentence: {
      text: "The lead architect, although repeatedly assured by the contractor that structural reinforcements would be finished by Friday, ultimately decided to postpone the official building inspection due to unverified foundation permits.",
      segments: [
        {
          text: "The lead architect",
          role: "subject",
          label: "Chủ ngữ (Subject)"
        },
        {
          text: ", although repeatedly assured by the contractor that structural reinforcements would be finished by Friday,",
          role: "subordinate_clause",
          label: "Mệnh đề phụ chêm xen (Modifier)"
        },
        {
          text: "ultimately decided to postpone",
          role: "main_verb",
          label: "Động từ chính (Main Action)"
        },
        {
          text: "the official building inspection",
          role: "object_clause",
          label: "Tân ngữ (Object)"
        },
        {
          text: "due to unverified foundation permits.",
          role: "subordinate_clause",
          label: "Nguyên nhân chính (Root Cause)"
        }
      ]
    },
    answers: [
      { id: "A", text: "The contractor failed to complete structural reinforcements on time" },
      { id: "B", text: "The architect could not attend the scheduled Friday meeting" },
      { id: "C", text: "Necessary permits for the foundation had not yet been verified" },
      { id: "D", text: "The building materials were rejected by government regulators" }
    ],
    correctAnswerId: "C",
    timing: {
      questionTimerSeconds: 5,
      scanTimerSeconds: 20,
      answerTimerSeconds: 10
    },
    evidence: {
      mode: "sentence_segments",
      chain: [
        { step: 1, segmentIndex: 0, label: "1. Chủ ngữ: The lead architect" },
        { step: 2, segmentIndex: 2, label: "2. Hành động: decided to postpone the inspection" },
        { step: 3, segmentIndex: 4, label: "3. Nguyên nhân: due to unverified foundation permits" }
      ]
    },
    why: "'due to unverified foundation permits' tương đương với phương án C."
  },
  {
    id: "q5",
    order: 5,
    type: "long_sentence",
    question: "What is currently happening with the customer loyalty program?",
    longSentence: {
      text: "Regional branch directors had enthusiastically endorsed the proposed customer loyalty program; however, due to severe corporate budget reductions, the executive committee has chosen to postpone implementation until the following financial year.",
      segments: [
        {
          text: "Regional branch directors had enthusiastically endorsed the proposed customer loyalty program;",
          role: "prior_clause",
          label: "Mệnh đề ban đầu"
        },
        {
          text: "however,",
          role: "transition_word",
          label: "Từ nối tương phản: 'however'"
        },
        {
          text: "due to severe corporate budget reductions,",
          role: "subordinate_clause",
          label: "Lý do: Cắt giảm ngân sách"
        },
        {
          text: "the executive committee has chosen to postpone implementation",
          role: "main_verb",
          label: "Quyết định thực tế: Hoãn triển khai"
        },
        {
          text: "until the following financial year.",
          role: "time_clause",
          label: "Thời hạn: Năm tài chính tiếp theo"
        }
      ]
    },
    answers: [
      { id: "A", text: "It is being expanded to all regional branch locations immediately" },
      { id: "B", text: "It was permanently canceled because of poor director feedback" },
      { id: "C", text: "Its rollout has been put on hold until the next financial year" },
      { id: "D", text: "It is currently undergoing final testing by the committee" }
    ],
    correctAnswerId: "C",
    timing: {
      questionTimerSeconds: 5,
      scanTimerSeconds: 20,
      answerTimerSeconds: 10
    },
    evidence: {
      mode: "sentence_segments",
      chain: [
        { step: 1, segmentIndex: 1, label: "1. 'however' đảo ngược ý mệnh đề trước" },
        { step: 2, segmentIndex: 3, label: "2. Quyết định: 'postpone implementation'" },
        { step: 3, segmentIndex: 4, label: "3. Thời hạn: 'until the following financial year'" }
      ]
    },
    why: "Sau từ nối 'however', ban điều hành quyết định hoãn triển khai sang năm tài chính tới."
  }
];
