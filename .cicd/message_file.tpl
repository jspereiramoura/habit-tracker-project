**Novo Deploy Realizado!**

• Projeto - {{tpl.app}} 

{{#success build.status}}
✅ **Deploy realizado com sucesso!**
{{else}}
❌ **Deploy falhou!**
⚠️ **Status do deploy: {{build.status}}**
{{/success}}


**Detalhes do Build:**
• **Number:** {{build.number}}
• **Link Drone:** {{build.link}}
• **Duração:** {{duration build.started build.finished}}

**Git:**
• **Branch:** {{commit.branch}}
• **Hash:** {{commit.sha}}
• **Author:** {{commit.author}}
• **Message:** {{commit.message}}

---

**Configuração do Ambiente:**
• **Ambiente:** {{tpl.env}}
• **Aplicativo:** {{tpl.app}}
• **URL de Acesso:** {{tpl.url}}
