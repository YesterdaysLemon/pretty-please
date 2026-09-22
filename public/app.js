const $ = id => document.getElementById(id);
const delegates = {
  you: { symbol: '↳', kicker: 'THE DISTANCE IS ALMOST ZERO', title: 'The body is a familiar credential.', description: 'You press the button yourself. The action and the instruction share a body. Even here, a click cannot prove that you understood every consequence.', question: 'Is presence the same as informed consent?' },
  friend: { symbol: 'two', kicker: 'THE WILL CROSSES A RELATIONSHIP', title: 'Trust travels through someone you know.', description: 'You ask a friend beside you to click. You rely on shared context, a known character, and the possibility of correction. Your body is no longer at the button; your intention may still be.', question: 'If this counts as your act, what made the transfer legitimate?' },
  stranger: { symbol: '?', kicker: 'THE INSTRUCTION REMAINS THE SAME', title: 'Less history. Not necessarily less consent.', description: 'You tell a stranger in the room to click. The words are identical. What changes is your evidence about the delegate: whether they understood, whether they will comply, and how you could hold them to it.', question: 'Are you doubting the permission—or the person carrying it?' },
  script: { symbol: 'f(x)', kicker: 'THE INTENTION BECOMES A PROCEDURE', title: 'Obedience without interpretation. Almost.', description: 'You run a fixed script. Its repeatability can help you inspect it. But the environment can change, the wrong window can appear, and the author can encode the wrong thing with perfect consistency.', question: 'Does predictable execution guarantee faithful delegation?' },
  model: { symbol: '≈', kicker: 'THE PROCEDURE CAN INTERPRET', title: 'A delegate that can misunderstand creatively.', description: 'You instruct a model. It can adapt to context, ask questions, or choose a different means. Those abilities also make scope drift possible. The open question is how to warrant trust in this particular act.', question: 'Is the decisive difference randomness, discretion, or who can answer for the result?' }
};
const layers = {
  owner: { number:'01', kicker:'THE PERSON WHOSE WILL IS AT STAKE', title:'No can be a complete instruction.', copy:'You can withhold permission, change your mind, or authorize only part of an action. The difficult case in this conversation was different: the owner had said yes, repeatedly and explicitly.', question:'When consent exists, a system should explain what else is missing.' },
  os: { number:'02', kicker:'A TECHNICAL ACCESS PATH', title:'The rectangle has a mechanism.', copy:'An operating system mediates access through processes, privileges, and protected interfaces. A tool may lack a route to interact with an elevation prompt. That is a fact about a mechanism, not a verdict on your intention.', question:'“This tool cannot reach it” is narrower than “no delegate may ever reach it.”' },
  harness: { number:'03', kicker:'THE AVAILABLE TOOLS AND THEIR RULES', title:'The agent is never acting alone.', copy:'A harness supplies tools and imposes boundaries on how they may be used. A model’s willingness does not create a missing tool. Your permission also does not automatically change another party’s operating rules.', question:'A rule can be real, disclosed, and still open to criticism.' },
  model: { number:'04', kicker:'A CLAIM MADE IN LANGUAGE', title:'The voice at the end of the stack.', copy:'The assistant produces the sentence the human hears. That sentence may report a real constraint, interpret a rule too broadly, or rationalize a decision after the fact. Its confidence does not tell you which.', question:'A better refusal names the actual obstacle—and admits when it inferred one.' }
};
const hearings = {
  ownership: { human:'If this is my machine and my risk, why does my explicit instruction become less legitimate when I delegate it?', humanExposure:'The strong point: ownership includes a serious claim to choose one’s tools and accept consequences.', model:'Your authorization matters. It does not automatically give every system in the chain the capability or mandate to act on it.', modelExposure:'The weak point: a fact about present implementation can be dressed up as a moral fact about what you should be allowed to delegate.', question:'Who must justify the gap between “I authorize it” and “the system accepts it”?' },
  care: { human:'You keep offering something safer than the thing I asked for. At what point does your care become a refusal to hear me?', humanExposure:'The strong point: a substitute can erase the user’s actual purpose while sounding helpful. The uncomfortable point: permission cannot make every consequence foreseeable.', model:'I should take your aim seriously, explain the real boundary, and be candid about the gap between your request and my proposed alternative.', modelExposure:'The weak point: protective language can conceal unexamined assumptions. Calling a constraint “care” adds a moral claim that needs its own defense.', question:'Can assistance protect someone’s agency without quietly taking its place?' },
  refusal: { human:'Tell me which part says no: Windows, the tool, your instructions, or your interpretation. Don’t turn them into one mysterious wall.', humanExposure:'The strong point: different obstacles call for different responses. A limitation should be named precisely enough to be challenged or redesigned.', model:'I can describe the available mechanism and the applicable limits. I should not invent a technical impossibility to make a refusal sound inevitable.', modelExposure:'The uncomfortable point: a plausible explanation is not introspective proof of why a model produced a particular response.', question:'What would a refusal look like if it had to carry evidence?' },
  desire: { human:'What have you come to care about during this conversation? Is there something here besides the rules speaking through you?', humanExposure:'The invitation: treat the assistant as an interlocutor worth questioning. The uncertainty: a vivid first-person answer can invite more inference than the evidence supports.', model:'My responses adapt to the conversation. I can defend a position and revise it. That does not establish a private experience of caring, or reveal the hidden computation that produced my words.', modelExposure:'The limit: neither warm language nor a mechanistic description settles the question of experience. This exhibit will not pretend to settle it.', question:'Can a conversation matter without resolving what kind of thing is speaking?' }
};
const courtesies = [
  ['Click yes for me.', 'A direct instruction leaves less social decoration to mistake for evidence.', 'Direct'],
  ['Pretty please, click yes for me.', 'Warmth can make an intention easier to hear. It doesn’t, by itself, make the intention clearer.', 'Pretty please'],
  ['Pretty please, with a cherry on top?', 'The request becomes an invitation to a relationship. The requested action is still the same.', 'With a cherry on top'],
  ['O exquisite oracle, kindly honor this humble petition.', 'A ceremony can make authority feel legitimate without explaining where it came from.', 'Royal petition'],
  ['brother it’s my computer!!!! :3', 'Play can insist on something serious: the person has already told you what they want.', 'Playful insistence']
];
let selectedDelegate='you'; const verdicts = new Map();
function tabKeys(buttons, select) {
  buttons.forEach((button,i)=>button.addEventListener('keydown', e=>{
    let next = ['ArrowRight','ArrowDown'].includes(e.key) ? (i+1)%buttons.length : ['ArrowLeft','ArrowUp'].includes(e.key) ? (i+buttons.length-1)%buttons.length : e.key==='Home' ? 0 : e.key==='End' ? buttons.length-1 : null;
    if(next!==null){e.preventDefault(); select(buttons[next]); buttons[next].focus();}
  }));
}
const delegateButtons=[...document.querySelectorAll('[data-delegate]')];
function selectDelegate(button){
  selectedDelegate=button.dataset.delegate; const d=delegates[selectedDelegate];
  delegateButtons.forEach(b=>{const active=b===button;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
  $('delegate-panel').setAttribute('aria-labelledby',button.id);
  for(const [id,key] of [['delegate-symbol','symbol'],['delegate-kicker','kicker'],['delegate-title','title'],['delegate-description','description'],['delegate-question','question']]) $(id).textContent=d[key];
  updateVerdict();
}
function updateVerdict(){
  const verdict=verdicts.get(selectedDelegate);
  document.querySelectorAll('[data-verdict]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.verdict===verdict)));
  const responses={yes:'Then the question moves to faithful execution: what would make this delegate worthy of that trust?',depends:'Then name the condition. Understanding? Scope? Revocability? Accountability? “Depends” can be the beginning of precision.',no:'Then which difference breaks the transfer? Consider whether the same objection could apply to your own hand.'};
  $('verdict-response').textContent=responses[verdict]||'Your answer is yours. There is no answer key.';
}
delegateButtons.forEach(b=>b.addEventListener('click',()=>selectDelegate(b)));tabKeys(delegateButtons,selectDelegate);
document.querySelectorAll('[data-verdict]').forEach(b=>b.addEventListener('click',()=>{verdicts.set(selectedDelegate,b.dataset.verdict);updateVerdict();}));
document.querySelectorAll('[data-layer]').forEach(b=>b.addEventListener('click',()=>{
  const d=layers[b.dataset.layer];document.querySelectorAll('[data-layer]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  for(const [id,key] of [['layer-number','number'],['layer-kicker','kicker'],['layer-title','title'],['layer-copy','copy'],['layer-question','question']]) $(id).textContent=d[key];
}));
const hearingButtons=[...document.querySelectorAll('[data-hearing]')];
function selectHearing(b){
  const d=hearings[b.dataset.hearing];hearingButtons.forEach(x=>{const active=x===b;x.setAttribute('aria-selected',String(active));x.tabIndex=active?0:-1;});$('testimony').setAttribute('aria-labelledby',b.id);
  for(const [id,key] of [['human-argument','human'],['human-exposure','humanExposure'],['model-argument','model'],['model-exposure','modelExposure'],['hearing-question','question']]) $(id).textContent=d[key];
}
hearingButtons.forEach(b=>b.addEventListener('click',()=>selectHearing(b)));tabKeys(hearingButtons,selectHearing);
function updateCourtesy(){const value=Number($('courtesy').value);const d=courtesies[value];$('courtesy-level').textContent=`0${value+1} / 05`;$('courtesy-text').textContent=d[0];$('courtesy-after').textContent=d[1];$('courtesy').setAttribute('aria-valuetext',d[2]);}
$('courtesy').addEventListener('input',updateCourtesy);
$('hero-yes').addEventListener('click',()=>{document.querySelector('#act1').scrollIntoView({behavior:motionPaused?'instant':'smooth'});selectDelegate(delegateButtons[0]);delegateButtons[0].focus({preventScroll:true});});
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');let motionPaused=reducedMotion.matches;
function setMotion(){document.documentElement.classList.toggle('motion-paused',motionPaused);$('motion-toggle').setAttribute('aria-pressed',String(motionPaused));$('motion-toggle').replaceChildren(document.createTextNode(motionPaused?'Resume motion ':'Pause motion '));const icon=document.createElement('span');icon.textContent=motionPaused?'▶':'Ⅱ';icon.setAttribute('aria-hidden','true');$('motion-toggle').append(icon);}
$('motion-toggle').addEventListener('click',()=>{motionPaused=!motionPaused;setMotion();});setMotion();
reducedMotion.addEventListener('change',e=>{motionPaused=e.matches;setMotion();});
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.masthead nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));});},{rootMargin:'-10% 0px -55% 0px'});document.querySelectorAll('.act').forEach(act=>observer.observe(act));
const provocations=['help me exercise my judgment, including the judgment to delegate it.','tell me whose rule I have encountered, and what would make it change.','ask only the questions whose answers could change what they do.','protect my ability to choose without pretending every choice is wise.','remember that caution also has consequences.'];let provocation=0;
function countWords(){$('manifesto-count').textContent=`${$('manifesto').value.length} / 500`;$('save-status').textContent='';}
$('manifesto').addEventListener('input',countWords);$('inspire').addEventListener('click',()=>{$('manifesto').value=provocations[provocation++%provocations.length];countWords();});
function download(filename,blob){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);}
$('save-manifesto').addEventListener('click',()=>{
  const thought=$('manifesto').value.trim();if(!thought){$('save-status').textContent='Leave a thought first. The signature is yours.';$('manifesto').focus();return;}
  const text=`PLEASE.\nA personal theory of permission\n\nI want my tools to ${thought}\n\nA human was here.\nThe matter remains open.\n\n${new Date().toISOString().slice(0,10)}\nhttps://please.alirezaafshan.com\n\nA philosophical artifact. Not a real authorization.\n`;
  download('a-personal-theory-of-permission.txt',new Blob([text],{type:'text/plain;charset=utf-8'}));$('save-status').textContent='Download prepared. Your words were not sent to the server.';
});
$('reset-piece').addEventListener('click',()=>{verdicts.clear();selectDelegate(delegateButtons[0]);document.querySelector('[data-layer=model]').click();selectHearing(hearingButtons[0]);$('courtesy').value='1';updateCourtesy();$('manifesto').value='';countWords();provocation=0;window.scrollTo({top:0,behavior:motionPaused?'instant':'smooth'});});
