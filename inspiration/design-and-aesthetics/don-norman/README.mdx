# Don Norman's Human-Centered Design Philosophy

## Overview

Don Norman, cognitive scientist and usability engineer, revolutionized design thinking by placing human needs, capabilities, and behaviors at the center of the design process. His philosophy emphasizes that good design must start with understanding people and their real needs, not with technology or aesthetic considerations.

### Core Tenets of Human-Centered Design

1. **Focus on Users**: Design decisions should be based on deep understanding of users' goals, tasks, and contexts
2. **Iterative Process**: Design through cycles of observation, ideation, prototyping, and testing
3. **Systems Thinking**: Consider the entire experience, not just individual touchpoints
4. **Error Tolerance**: Accept that humans make mistakes and design systems that prevent or gracefully handle errors
5. **Accessibility**: Design for the full range of human diversity

## The Seven Fundamental Design Principles

### 1. Discoverability

**Definition**: Users should be able to figure out what actions are possible and where/how to perform them.

**Modern Web/Mobile Examples**:
- **Good**: Hamburger menu icon (☰) universally indicates a navigation menu
- **Good**: Bottom navigation bars in mobile apps show 4-5 clearly labeled main sections
- **Bad**: Hidden gestures with no visual indicators (e.g., swipe from edge with no hint)

**Implementation**:
```html
<!-- Good: Clear, discoverable action -->
<button class="primary-action" aria-label="Create new document">
  <svg><!-- plus icon --></svg>
  <span>New Document</span>
</button>

<!-- Bad: Hidden functionality -->
<div class="container" data-secret-double-tap="true">
  <!-- No indication of double-tap functionality -->
</div>
```

### 2. Feedback

**Definition**: The system should continuously inform users about what is happening through appropriate feedback within reasonable time.

**Modern Web/Mobile Examples**:
- **Good**: Loading spinners, progress bars, and skeleton screens
- **Good**: Haptic feedback on mobile devices for button presses
- **Good**: Toast notifications for successful actions
- **Bad**: Form submission with no indication of success/failure

**Implementation**:
```javascript
// Good: Immediate feedback
async function saveDocument() {
  setStatus('saving');
  showToast('Saving document...', { type: 'info' });
  
  try {
    await api.save(document);
    showToast('Document saved!', { type: 'success' });
  } catch (error) {
    showToast('Failed to save. Please try again.', { type: 'error' });
  } finally {
    setStatus('idle');
  }
}
```

### 3. Conceptual Model

**Definition**: The design should communicate a clear mental model of how the system works.

**Modern Web/Mobile Examples**:
- **Good**: Trello's card/board metaphor for project management
- **Good**: Shopping cart icon for e-commerce
- **Good**: Folder/file structure in cloud storage apps
- **Bad**: Abstract icons that don't relate to their function

### 4. Affordances

**Definition**: The properties of an object that show the possible actions users can take with it.

**Modern Web/Mobile Examples**:
- **Good**: Buttons that look clickable (shadows, borders, hover states)
- **Good**: Text fields with clear boundaries and placeholder text
- **Good**: Slider controls that visually suggest dragging
- **Bad**: Flat design taken to extremes where buttons look like labels

**Implementation**:
```css
/* Good: Clear affordances */
.button {
  background: #007bff;
  border: 1px solid #0056b3;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.button:hover {
  background: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Bad: No affordances */
.flat-button {
  background: transparent;
  border: none;
  color: #333;
  /* Looks identical to regular text */
}
```

### 5. Signifiers

**Definition**: Perceptible signals that communicate where actions should take place.

**Modern Web/Mobile Examples**:
- **Good**: Underlined links in text
- **Good**: Input field labels and placeholder text
- **Good**: Hover tooltips explaining icon functions
- **Bad**: Clickable elements that look identical to non-clickable ones

### 6. Mappings

**Definition**: The relationship between controls and their effects should be as direct and logical as possible.

**Modern Web/Mobile Examples**:
- **Good**: Volume slider where right/up increases volume
- **Good**: Swipe directions matching content movement
- **Good**: Color temperature controls using blue-to-orange gradient
- **Bad**: Arbitrary relationships like using red for "go" and green for "stop"

### 7. Constraints

**Definition**: Limitations that guide users toward correct usage and prevent errors.

**Modern Web/Mobile Examples**:
- **Good**: Disabled submit button until form is valid
- **Good**: Character limits with counters in text inputs
- **Good**: Date pickers that prevent selecting past dates for future events
- **Bad**: Allowing users to enter invalid data that fails on submission

**Implementation**:
```javascript
// Good: Constraints prevent errors
function DatePicker({ minDate, maxDate, onSelect }) {
  return (
    <input
      type="date"
      min={minDate}
      max={maxDate}
      onChange={(e) => {
        const date = new Date(e.target.value);
        if (date >= minDate && date <= maxDate) {
          onSelect(date);
        }
      }}
    />
  );
}
```

## Core Concepts

### Affordances

**Definition**: Properties that define possible uses of an object.

**Types**:
1. **Physical Affordances**: What actions are physically possible
2. **Perceived Affordances**: What actions users believe are possible

**Examples in Digital Design**:
- Buttons afford clicking/tapping
- Sliders afford dragging
- Text fields afford typing
- Links afford navigation

### Signifiers

**Definition**: Signals that communicate what actions are possible and how to perform them.

**Best Practices**:
- Make signifiers visible and unambiguous
- Use consistent signifiers across the interface
- Provide multiple signifiers for important actions
- Test signifiers with actual users

### Feedback

**Definition**: Information about what action has been done and what result was accomplished.

**Types**:
1. **Immediate Feedback**: Instant response (hover states, button depress)
2. **Progress Feedback**: Ongoing operations (progress bars, spinners)
3. **Completion Feedback**: Final results (success messages, error states)

### Constraints

**Definition**: Restrictions on possible actions at any moment.

**Types**:
1. **Physical**: Use properties of physical objects to constrain operations
2. **Cultural**: Use cultural conventions
3. **Semantic**: Use meaning to constrain actions
4. **Logical**: Use logical relationships

## Error Prevention and Recovery Patterns

### Prevention Strategies

1. **Constraints and Validation**
```javascript
// Prevent invalid email submission
function EmailInput({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validate = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };
  
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validate(e.target.value);
        }}
        aria-invalid={!!error}
        aria-describedby="email-error"
      />
      {error && <span id="email-error" role="alert">{error}</span>}
      <button 
        onClick={() => onSubmit(email)}
        disabled={!email || !!error}
      >
        Submit
      </button>
    </div>
  );
}
```

2. **Confirmation for Destructive Actions**
```javascript
// Prevent accidental deletion
function DeleteButton({ onDelete, itemName }) {
  const [showConfirm, setShowConfirm] = useState(false);
  
  if (showConfirm) {
    return (
      <div role="alertdialog" aria-labelledby="delete-title">
        <h3 id="delete-title">Confirm Deletion</h3>
        <p>Are you sure you want to delete "{itemName}"? This cannot be undone.</p>
        <button onClick={() => setShowConfirm(false)}>Cancel</button>
        <button onClick={() => { onDelete(); setShowConfirm(false); }}>
          Delete Permanently
        </button>
      </div>
    );
  }
  
  return <button onClick={() => setShowConfirm(true)}>Delete</button>;
}
```

3. **Progressive Disclosure**
```javascript
// Prevent overwhelming users with complex forms
function ProgressiveForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  
  return (
    <form>
      {step === 1 && <BasicInfo onNext={(info) => {
        setData({...data, ...info});
        setStep(2);
      }} />}
      
      {step === 2 && <DetailedInfo 
        onBack={() => setStep(1)}
        onNext={(info) => {
          setData({...data, ...info});
          setStep(3);
        }} 
      />}
      
      {step === 3 && <Review 
        data={data}
        onBack={() => setStep(2)}
        onSubmit={() => submitForm(data)}
      />}
    </form>
  );
}
```

### Recovery Patterns

1. **Undo/Redo Functionality**
```javascript
// Allow users to recover from mistakes
class UndoableEditor {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }
  
  execute(action) {
    // Remove any actions after current index
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    // Add new action
    this.history.push(action);
    this.currentIndex++;
    
    // Execute the action
    action.do();
  }
  
  undo() {
    if (this.currentIndex >= 0) {
      this.history[this.currentIndex].undo();
      this.currentIndex--;
    }
  }
  
  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.history[this.currentIndex].do();
    }
  }
}
```

2. **Graceful Error Messages**
```javascript
// Helpful error messages that guide users
function ErrorMessage({ error }) {
  const getHelpfulMessage = (error) => {
    switch(error.code) {
      case 'NETWORK_ERROR':
        return {
          title: "Connection Problem",
          message: "We couldn't reach our servers. Please check your internet connection and try again.",
          actions: [
            { label: "Retry", action: () => window.location.reload() },
            { label: "Work Offline", action: () => enableOfflineMode() }
          ]
        };
      
      case 'AUTH_FAILED':
        return {
          title: "Sign In Required",
          message: "Your session has expired. Please sign in again to continue.",
          actions: [
            { label: "Sign In", action: () => redirectToLogin() }
          ]
        };
      
      default:
        return {
          title: "Something Went Wrong",
          message: "We encountered an unexpected error. Our team has been notified.",
          actions: [
            { label: "Go Back", action: () => window.history.back() },
            { label: "Contact Support", action: () => openSupportChat() }
          ]
        };
    }
  };
  
  const { title, message, actions } = getHelpfulMessage(error);
  
  return (
    <div role="alert" className="error-message">
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="actions">
        {actions.map(({ label, action }) => (
          <button key={label} onClick={action}>{label}</button>
        ))}
      </div>
    </div>
  );
}
```

## Applications for AI Interface Design

### 1. Conversational UI Principles

**Discoverability in AI**:
- Show example prompts and capabilities upfront
- Provide command suggestions and auto-completion
- Clear indication of AI's capabilities and limitations

```javascript
// AI interface with good discoverability
function AIAssistant() {
  return (
    <div>
      <div className="capabilities">
        <h3>I can help you with:</h3>
        <ul>
          <li>Writing and editing text</li>
          <li>Answering questions</li>
          <li>Analyzing data</li>
          <li>Generating ideas</li>
        </ul>
      </div>
      
      <div className="prompt-suggestions">
        <p>Try asking:</p>
        <button onClick={() => setPrompt("Help me write an email about...")}>
          "Help me write an email about..."
        </button>
        <button onClick={() => setPrompt("Explain how...")}>
          "Explain how..."
        </button>
      </div>
    </div>
  );
}
```

### 2. Feedback in AI Systems

**Progressive Response Indicators**:
```javascript
// Show AI thinking process
function AIResponse({ prompt }) {
  const [state, setState] = useState('thinking');
  const [response, setResponse] = useState('');
  
  return (
    <div>
      {state === 'thinking' && (
        <div className="thinking-indicator">
          <div className="dots-animation"></div>
          <p>AI is thinking...</p>
        </div>
      )}
      
      {state === 'generating' && (
        <div className="generating-indicator">
          <div className="progress-bar"></div>
          <p>Generating response...</p>
        </div>
      )}
      
      {state === 'complete' && (
        <div className="response">
          {response}
          <button onClick={() => regenerate()}>Regenerate</button>
          <button onClick={() => modify()}>Modify</button>
        </div>
      )}
    </div>
  );
}
```

### 3. Error Prevention in AI Interactions

**Input Validation and Guidance**:
```javascript
// Prevent common AI prompt errors
function AIPromptInput({ onSubmit }) {
  const [prompt, setPrompt] = useState('');
  const [warnings, setWarnings] = useState([]);
  
  const validatePrompt = (text) => {
    const newWarnings = [];
    
    if (text.length < 10) {
      newWarnings.push("Your prompt is very short. Adding more detail will improve results.");
    }
    
    if (text.length > 4000) {
      newWarnings.push("Your prompt is very long. Consider breaking it into smaller parts.");
    }
    
    if (/[<>{}]/.test(text)) {
      newWarnings.push("Special characters detected. These might not be processed as expected.");
    }
    
    setWarnings(newWarnings);
  };
  
  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          validatePrompt(e.target.value);
        }}
        placeholder="Describe what you'd like help with..."
      />
      
      {warnings.map(warning => (
        <div key={warning} className="warning" role="alert">
          <Icon name="info" />
          {warning}
        </div>
      ))}
      
      <button 
        onClick={() => onSubmit(prompt)}
        disabled={!prompt.trim()}
      >
        Send
      </button>
    </div>
  );
}
```

### 4. Conceptual Models for AI

**Making AI Behavior Understandable**:
```javascript
// Clear mental model of AI capabilities
function AICapabilityIndicator({ task }) {
  const capabilities = {
    'text-generation': { confidence: 'high', description: 'I excel at writing and editing' },
    'code-generation': { confidence: 'high', description: 'I can write and debug code' },
    'image-generation': { confidence: 'none', description: 'I cannot create images' },
    'real-time-data': { confidence: 'low', description: 'My knowledge is not real-time' }
  };
  
  const capability = capabilities[task] || { confidence: 'medium', description: 'I can try to help' };
  
  return (
    <div className={`capability-indicator ${capability.confidence}`}>
      <Icon name={capability.confidence} />
      <span>{capability.description}</span>
    </div>
  );
}
```

## Prompt Patterns for User-Friendly Experiences

### 1. Progressive Prompting Pattern

**Structure**: Guide users through complex requests step by step

```javascript
// Progressive prompt builder
class ProgressivePromptBuilder {
  constructor() {
    this.steps = [
      {
        question: "What would you like to create?",
        options: ["Document", "Code", "Analysis", "Other"]
      },
      {
        question: "What type of {previousChoice}?",
        options: (prev) => this.getSubOptions(prev)
      },
      {
        question: "Any specific requirements?",
        type: "text"
      }
    ];
  }
  
  buildPrompt(responses) {
    return `Create a ${responses[1]} ${responses[0]} with the following requirements: ${responses[2]}`;
  }
}
```

### 2. Template-Based Prompting

**Structure**: Provide fill-in-the-blank templates

```javascript
// Template system for common AI tasks
const promptTemplates = {
  email: {
    template: "Write a professional email to [recipient] about [topic]. The tone should be [tone] and include [key points].",
    fields: [
      { name: "recipient", placeholder: "e.g., my manager" },
      { name: "topic", placeholder: "e.g., project update" },
      { name: "tone", options: ["formal", "friendly", "urgent"] },
      { name: "key points", type: "textarea", placeholder: "Main points to cover" }
    ]
  },
  
  codeDebug: {
    template: "Debug this [language] code that should [expected behavior] but instead [actual behavior]. Code: [code]",
    fields: [
      { name: "language", placeholder: "e.g., JavaScript" },
      { name: "expected behavior", placeholder: "What it should do" },
      { name: "actual behavior", placeholder: "What it's doing wrong" },
      { name: "code", type: "code", placeholder: "Paste your code here" }
    ]
  }
};
```

### 3. Contextual Help Pattern

**Structure**: Provide context-sensitive guidance

```javascript
// Context-aware prompt assistance
function PromptAssistant({ userInput, context }) {
  const suggestions = generateSuggestions(userInput, context);
  
  return (
    <div className="prompt-assistant">
      {suggestions.clarifications && (
        <div className="clarifications">
          <p>To get better results, consider adding:</p>
          <ul>
            {suggestions.clarifications.map(item => (
              <li key={item}>
                <button onClick={() => appendToPrompt(item)}>
                  + {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {suggestions.examples && (
        <div className="examples">
          <p>Similar successful prompts:</p>
          {suggestions.examples.map(example => (
            <button 
              key={example} 
              onClick={() => useExample(example)}
              className="example-prompt"
            >
              {example}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 4. Error Recovery Pattern for AI

**Structure**: Gracefully handle AI limitations

```javascript
// AI error handling with user guidance
function AIErrorHandler({ error, originalPrompt }) {
  const getRecoveryOptions = (error) => {
    switch(error.type) {
      case 'UNCLEAR_REQUEST':
        return {
          message: "I'm not quite sure what you're asking for.",
          suggestions: [
            "Add more specific details",
            "Break down into smaller questions",
            "Use one of our templates"
          ],
          actions: [
            { label: "Rephrase", action: () => showRephraseTool() },
            { label: "See Examples", action: () => showExamples() }
          ]
        };
      
      case 'CAPABILITY_LIMIT':
        return {
          message: "This request is outside my current capabilities.",
          suggestions: [
            "Try a different approach",
            "Break into smaller tasks",
            "Use available tools"
          ],
          actions: [
            { label: "Modify Request", action: () => editPrompt() },
            { label: "Get Human Help", action: () => escalateToHuman() }
          ]
        };
      
      default:
        return {
          message: "Something went wrong with your request.",
          suggestions: ["Try again", "Simplify your request"],
          actions: [
            { label: "Retry", action: () => retry() },
            { label: "Start Over", action: () => reset() }
          ]
        };
    }
  };
  
  const recovery = getRecoveryOptions(error);
  
  return (
    <div className="ai-error-recovery">
      <h3>{recovery.message}</h3>
      <div className="suggestions">
        <p>Suggestions:</p>
        <ul>
          {recovery.suggestions.map(suggestion => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      </div>
      <div className="actions">
        {recovery.actions.map(({ label, action }) => (
          <button key={label} onClick={action}>{label}</button>
        ))}
      </div>
    </div>
  );
}
```

## Best Practices Summary

### For Traditional UI:
1. **Make actions discoverable** - Users shouldn't have to hunt for features
2. **Provide immediate feedback** - Every action should have a clear response
3. **Use familiar metaphors** - Build on users' existing mental models
4. **Prevent errors proactively** - Constraints are better than error messages
5. **Make recovery easy** - Undo, clear error messages, and helpful guidance

### For AI Interfaces:
1. **Set clear expectations** - Be transparent about AI capabilities and limitations
2. **Guide prompt creation** - Templates, examples, and progressive disclosure
3. **Show thinking process** - Indicate when AI is processing and what it's doing
4. **Handle failures gracefully** - Provide alternatives when AI can't fulfill a request
5. **Learn from interactions** - Adapt suggestions based on user patterns

### Universal Principles:
1. **Design for all users** - Consider accessibility from the start
2. **Test with real users** - Assumptions about usability are often wrong
3. **Iterate based on feedback** - Design is never finished
4. **Document patterns** - Create design systems for consistency
5. **Measure success** - Use metrics to validate design decisions

## References and Further Reading

- "The Design of Everyday Things" by Don Norman (Revised Edition, 2013)
- "Emotional Design: Why We Love (or Hate) Everyday Things" by Don Norman
- "Living with Complexity" by Don Norman
- Norman's articles on jnd.org
- Nielsen Norman Group research reports
- ISO 9241-210:2019 Human-centred design for interactive systems