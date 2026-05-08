# Beginner's Guide to the `ui-mcp-server` Content Folder

Welcome! This guide will help you understand the structure, purpose, and development flow of the `ui-mcp-server` project, especially focusing on the `src/content` folder. We'll use simple language, diagrams, and step-by-step explanations.

---

## 1. What is MCP?

**MCP** stands for **Model Context Protocol**. In this project, it means a way for the server to organize, store, and serve knowledge about UI (User Interface) principles and psychology to other tools or users.

---

## 2. Project Structure Overview

```
ui-mcp-server/
├── package.json         # Project dependencies and scripts
├── README.md            # Project overview
├── tsconfig.json        # TypeScript config
├── scripts/             # Helper scripts
├── src/                 # Main source code
│   ├── server.ts        # Main server code
│   ├── content/         # <--- UI knowledge base (focus here!)
│   ├── storage/         # Data storage logic
│   └── tools/           # Utility tools
```

---

## 3. The `content` Folder: Your Playground

This folder is the heart of the knowledge base. It contains JSON files with rules, principles, and examples about UI design and psychology.

```
content/
├── principles.json           # Main list of principles
├── aesthetics/               # Aesthetics-related principles
│   └── principles.json
├── cognitive/                # Cognitive psychology principles
│   └── principles.json
├── interaction/              # Interaction design principles
│   └── principles.json
├── persuasion/               # Persuasion principles
│   └── principles.json
├── visual/                   # Visual design principles
│   └── principles.json
└── kb/                       # Knowledge base extras
    ├── brand_examples.json
    ├── typography_spec.json
    └── visual_principles.json
```

### Diagram: Content Folder Map

```
content/
|
|-- principles.json
|-- aesthetics/
|    |-- principles.json
|-- cognitive/
|    |-- principles.json
|-- interaction/
|    |-- principles.json
|-- persuasion/
|    |-- principles.json
|-- visual/
|    |-- principles.json
|-- kb/
     |-- brand_examples.json
     |-- typography_spec.json
     |-- visual_principles.json
```

---

## 4. How Does It Work? (Simple Flow)

1. **Server Starts**: `server.ts` loads the JSON files from `content/`.
2. **Knowledge is Served**: The server provides this knowledge to users or tools (like a chatbot or UI assistant).
3. **You Can Contribute**: Add or edit rules in the JSON files to improve the knowledge base.

### Text Diagram: Data Flow

```
[JSON files in content/]  --->  [server.ts loads them]  --->  [Knowledge served to users]
```

---

## 5. How to Contribute (Step-by-Step)

1. **Pick a File**: Choose a JSON file in `content/` (e.g., `aesthetics/principles.json`).
2. **Open and Edit**: Add a new principle or update an existing one. Each principle is usually an object with fields like `id`, `name`, `description`, etc.
3. **Save and Test**: Save your changes. If you want, run the server to see if your changes work.
4. **Commit and Push**: Use Git to commit your changes and push them to the repository.

---

## 6. Example: Adding a New Principle

Suppose you want to add a new principle to `visual/principles.json`:

```json
[
  {
    "id": "vh-001",
    "name": "Visual Hierarchy",
    "description": "Arrange elements to show importance."
  },
  // Add your new principle here
  {
    "id": "vh-002",
    "name": "Whitespace",
    "description": "Use empty space to improve clarity."
  }
]
```

---

## 7. Development Basics

- **Install dependencies**: `npm install`
- **Run the server**: `npm start` or `node src/server.ts`
- **Edit content**: Change JSON files in `src/content/`
- **Test changes**: Check if the server loads your new/updated rules

---

## 8. Tips for Beginners

- JSON files must be valid! Use an online JSON validator if unsure.
- Keep your changes simple and clear.
- Ask for help if you get stuck—everyone starts somewhere!

---

## 9. Useful Resources

- [README.md](../README.md) — Project overview
- [ui_design_knowledge_base.md](../ui_principles/ui_design_knowledge_base.md) — More about UI principles
- [GitHub: What is a Pull Request?](https://docs.github.com/en/pull-requests)

---

## 10. Summary Diagram: How Everything Connects

```
[You] --edit--> [content/*.json]
   |
   v
[Server loads content]
   |
   v
[Knowledge shared with users]
```

---

Welcome to the project! Start small, experiment, and have fun learning and contributing!