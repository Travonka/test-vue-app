import{d as n}from"./deepseekApi-BbGClSq_.js";class c{async evaluateTextAnswer(e,r){console.log("🤖 Starting AI evaluation of text answer..."),console.log("📝 User answer length:",e.length),console.log("🎯 Exercise:",r.exerciseTitle);try{const t=this.createEvaluationPrompt(e,r);console.log("📝 Created evaluation prompt");const o=await n.chatCompletion([{role:"system",content:t.system},{role:"user",content:t.user}],{temperature:.3,maxTokens:2e3});console.log("✅ Received AI evaluation:",o);const s=this.parseEvaluationResponse(o);return console.log("🔄 Parsed evaluation result:",s),s}catch(t){throw console.error("❌ AI evaluation failed:",t),new Error(`AI evaluation failed: ${t instanceof Error?t.message:"Unknown error"}`)}}createEvaluationPrompt(e,r){const t=`Ты - эксперт-преподаватель, который оценивает ответы студентов на учебные задания. 

Твоя задача:
1. Проанализировать ответ студента на предмет правильности и полноты
2. Дать конструктивную обратную связь
3. Предложить улучшения
4. Выставить оценку от 0 до 100

Критерии оценки:
- Правильность ответа (40%)
- Полнота и детализация (30%)
- Структурированность и логика (20%)
- Качество изложения (10%)

Отвечай ТОЛЬКО в формате JSON:
{
  "isCorrect": boolean,
  "score": number (0-100),
  "feedback": "подробная обратная связь на русском языке",
  "suggestions": ["предложение 1", "предложение 2"],
  "strengths": ["сильная сторона 1", "сильная сторона 2"],
  "improvements": ["что улучшить 1", "что улучшить 2"]
}`,o=`Задание: ${r.exerciseTitle}

Описание: ${r.exerciseDescription}

${r.expectedAnswer?`Ожидаемый ответ: ${r.expectedAnswer}`:""}

${r.evaluationCriteria?`Критерии оценки: ${r.evaluationCriteria.join(", ")}`:""}

Ответ студента: "${e}"

Проанализируй ответ и дай оценку в указанном JSON формате.`;return{system:t,user:o}}parseEvaluationResponse(e){try{const r=e.match(/```json\s*([\s\S]*?)\s*```/);if(r){const s=JSON.parse(r[1].trim());return this.normalizeEvaluationResult(s)}const t=e.indexOf("{");if(t!==-1){const s=e.lastIndexOf("}");if(s!==-1&&s>t){const a=e.substring(t,s+1),i=JSON.parse(a);return this.normalizeEvaluationResult(i)}}const o=JSON.parse(e);return this.normalizeEvaluationResult(o)}catch(r){return console.error("❌ Failed to parse evaluation response:",r),{isCorrect:!1,score:0,feedback:"Не удалось обработать ответ. Попробуйте еще раз.",suggestions:["Проверьте правильность написания ответа"],strengths:[],improvements:["Убедитесь, что ответ соответствует заданию"]}}}normalizeEvaluationResult(e){return{isCorrect:!!e.isCorrect,score:Math.max(0,Math.min(100,Number(e.score)||0)),feedback:String(e.feedback||"Обратная связь недоступна"),suggestions:Array.isArray(e.suggestions)?e.suggestions:[],strengths:Array.isArray(e.strengths)?e.strengths:[],improvements:Array.isArray(e.improvements)?e.improvements:[]}}async generateHint(e,r,t){console.log("💡 Generating AI hint...");try{const o=`Ты - помощник-преподаватель. Дай полезную подсказку для задания.

Задание: ${e}
Описание: ${r}

${t?`Текущий ответ студента: "${t}"`:""}

Дай подсказку, которая поможет студенту, но не раскрывает полный ответ. Подсказка должна быть на русском языке и не более 2-3 предложений.`;return(await n.chatCompletion([{role:"user",content:o}],{temperature:.7,maxTokens:200})).trim()}catch(o){return console.error("❌ Failed to generate hint:",o),"Подсказка временно недоступна. Попробуйте еще раз."}}}const u=new c;export{u as a};
//# sourceMappingURL=aiExerciseService-C8i7KRHj.js.map
