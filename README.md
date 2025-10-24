#  Buggy Todo App

A simple Todo List application with **intentional bugs** designed for open source contributors to practice debugging and contributing to projects.

## 🎯 Purpose

This project is specifically created for:
- **Hacktoberfest participants** looking for beginner-friendly issues
- **Open source newcomers** wanting to practice debugging
- **Contributors** learning how to identify and fix bugs
- **Students** understanding common web development issues
# Todo App — 

This repo is a small Express + static frontend Todo app intentionally seeded with beginner-friendly bugs. Below is a short list of the real issues to fix.

## Quick run
1. npm install
2. npm run dev
3. Open http://localhost:3000

## Short list of bugs (high priority first)
- Frontend: XSS risk — todos are rendered with innerHTML (use textContent / escape) — high
- Frontend: Edit/Delete uses inline onclick referencing `todoApp` (often undefined) — high
- Backend: ID generation uses `todos.length+1` — can produce duplicate IDs after deletes — medium-high
- Backend: No server-side validation/sanitization on POST/PUT — medium
- Backend: No global error-handling middleware — medium
- Frontend: Enter key and input validation missing; no user-visible error messages — medium
- Frontend: Clicking the "Add Todo" button doesn't add a todo in some cases (click action broken) — medium
- CSS: No responsive styles for small screens — low
- package.json: `main` points to `index.js` but server is `server.js` — low

If you want, pick one of the high-priority bugs and I can apply a minimal patch now.

-- Short and focused. Fix one bug per PR.
- Fix the ID generation bug

## 📝 Project Structure

```
buggy-todo-app/
├── public/
│   ├── index.html      # Main HTML file
│   ├── style.css       # CSS styles (with bugs)
│   └── script.js       # Frontend JavaScript (with bugs)
├── server.js           # Backend server (with bugs)
├── package.json        # Dependencies
└── README.md          # This file
```

## 🧪 Testing Your Fixes

1. **Start the server**: `npm run dev`
2. **Test the functionality** you fixed
3. **Check the browser console** for any errors
4. **Test on different screen sizes** (if fixing responsive issues)
5. **Try edge cases** (empty input, network errors, etc.)

## 🤝 Contributing Guidelines

- Be respectful and helpful
- Ask questions if you're unsure
- Provide clear descriptions in your PR
- Test your changes thoroughly
- Follow the existing code style

## 📚 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [JavaScript Best Practices](https://github.com/airbnb/javascript)

## 🏷️ Labels for Issues

- `good first issue` - Perfect for beginners
- `bug` - Something that's broken
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements
- `help wanted` - Extra attention needed


## 🙏 Acknowledgments

- Inspired by [OpenSource-UIT](https://github.com/OpenSource-UIT/) Hacktoberfest projects
- Created for educational purposes
- Thanks to all contributors who help make this project better!

---

**Happy Debugging! 🐛✨**
