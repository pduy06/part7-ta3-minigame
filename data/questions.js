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
      questionTimerSeconds: 10,
      scanTimerSeconds: 20
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
    type: "chart",
    question: "On which day does the marketing team meet after 3 PM?",
    media: {
      kind: "table",
      tableData: {
        columns: ["Day", "Team", "Meeting Time", "Conference Room"],
        rows: [
          ["Monday", "Sales & Outreach", "9:00 AM – 10:30 AM", "Room A"],
          ["Tuesday", "Marketing", "3:30 PM – 5:00 PM", "Room B"],
          ["Wednesday", "Marketing", "10:00 AM – 11:30 AM", "Room A"],
          ["Thursday", "Finance & Audit", "2:00 PM – 3:30 PM", "Room C"],
          ["Friday", "Human Resources", "1:30 PM – 3:00 PM", "Room B"]
        ]
      }
    },
    answers: [
      { id: "A", text: "Monday" },
      { id: "B", text: "Tuesday" },
      { id: "C", text: "Wednesday" },
      { id: "D", text: "Thursday" }
    ],
    correctAnswerId: "B",
    timing: {
      questionTimerSeconds: 10,
      scanTimerSeconds: 20
    },
    evidence: {
      mode: "table_cells",
      chain: [
        { step: 1, row: 1, col: 1, label: "Team: Marketing (Tuesday & Wednesday)" },
        { step: 2, row: 1, col: 2, label: "Time: 3:30 PM (Sau 3 PM)" },
        { step: 3, row: 1, col: 0, label: "Ngày: Tuesday" }
      ]
    },
    why: "Tuesday là ngày duy nhất đội Marketing họp lúc 3:30 PM (sau 3 PM)."
  },
  {
    id: "q2",
    order: 2,
    type: "form",
    question: "According to the invoice notice, what condition must be met to receive free standard shipping?",
    media: {
      kind: "table",
      tableData: {
        columns: ["Item Code", "Description", "Qty", "Unit Price", "Total"],
        rows: [
          ["PX-104", "Ergonomic Desk Chair", "2", "$85.00", "$170.00"],
          ["PX-208", "Wireless Presenter Pointer", "1", "$15.00", "$15.00"],
          ["SUBTOTAL", "Order Merchandise Total", "-", "-", "$185.00"],
          ["SHIPPING", "Standard Ground Delivery", "-", "-", "$15.00"],
          ["TOTAL DUE", "Balance Payable", "-", "-", "$200.00"]
        ],
        footnote: "SHIPPING POLICY: Standard delivery is complimentary on orders with merchandise subtotal exceeding $250.00 before taxes."
      }
    },
    answers: [
      { id: "A", text: "Ordering during the annual promotional clearance" },
      { id: "B", text: "Having a merchandise pre-tax subtotal greater than $250.00" },
      { id: "C", text: "Paying in advance with a commercial corporate card" },
      { id: "D", text: "Purchasing more than five office equipment items" }
    ],
    correctAnswerId: "B",
    timing: {
      questionTimerSeconds: 10,
      scanTimerSeconds: 20
    },
    evidence: {
      mode: "table_cells",
      chain: [
        { step: 1, row: 3, col: 0, label: "Mục cước vận chuyển (SHIPPING $15.00)" },
        { step: 2, row: 5, col: 0, label: "Chú thích chân trang: 'subtotal exceeding $250.00 before taxes'" }
      ]
    },
    why: "Chú thích quy định đơn hàng có tổng tiền trước thuế trên $250.00 được miễn cước."
  },
  {
    id: "q3",
    order: 3,
    type: "chart",
    question: "Which service category showed the highest improvement between Q1 and Q2?",
    media: {
      kind: "table",
      tableData: {
        columns: ["Service Category", "Q1 Score", "Q2 Score", "Net Change"],
        rows: [
          ["Baggage Handling", "3.8 / 5.0", "4.1 / 5.0", "+0.3"],
          ["In-flight Entertainment", "3.2 / 5.0", "4.4 / 5.0", "+1.2"],
          ["On-time Departure", "4.0 / 5.0", "4.3 / 5.0", "+0.3"],
          ["Customer Helpdesk", "3.5 / 5.0", "4.0 / 5.0", "+0.5"]
        ]
      }
    },
    answers: [
      { id: "A", text: "Baggage Handling" },
      { id: "B", text: "In-flight Entertainment" },
      { id: "C", text: "On-time Departure" },
      { id: "D", text: "Customer Helpdesk" }
    ],
    correctAnswerId: "B",
    timing: {
      questionTimerSeconds: 10,
      scanTimerSeconds: 20
    },
    evidence: {
      mode: "table_cells",
      chain: [
        { step: 1, row: 1, col: 0, label: "Dịch vụ: In-flight Entertainment" },
        { step: 2, row: 1, col: 1, label: "Q1: 3.2 ➔ Q2: 4.4" },
        { step: 3, row: 1, col: 3, label: "Mức tăng cao nhất: +1.2" }
      ]
    },
    why: "In-flight Entertainment có mức tăng lớn nhất (+1.2 điểm so với +0.3 và +0.5)."
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
      questionTimerSeconds: 10,
      scanTimerSeconds: 20
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
      questionTimerSeconds: 10,
      scanTimerSeconds: 20
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
