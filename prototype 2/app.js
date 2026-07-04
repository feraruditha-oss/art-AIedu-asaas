const titles = {
  dashboard: "数据看板",
  acquisition: "获客活动中心",
  content: "短视频获客",
  assessment: "少儿艺术测评页",
  report: "AI 测评报告页",
  booking: "试听预约页",
  leads: "老师线索后台",
};

const navItems = document.querySelectorAll(".nav-item");
const views = document.querySelectorAll(".view");
const viewTitle = document.querySelector("#viewTitle");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.dataset.view;

    switchView(target);
  });
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.go));
});

function switchView(target) {
  navItems.forEach((nav) => nav.classList.toggle("active", nav.dataset.view === target));
  views.forEach((view) => view.classList.toggle("active", view.id === target));
  viewTitle.textContent = titles[target];
}

const contentExamples = {
  "小红书": {
    title: "孩子画得满，不一定是乱，可能是在讲故事",
    body: "封面用完整作品，正文用老师口吻拆解：家长先别急着判断乱不乱，先看孩子有没有在安排角色、场景和故事。结尾轻轻带到附近家长可以带作品来体验课，让老师现场看看下一步怎么引导。",
  },
  "朋友圈": {
    title: "今天课堂里有个小细节，很值得记录",
    body: "朋友圈不用太像广告。直接发课堂片段和老师观察：孩子不是在把画面填满，而是在试着讲完整故事。最后自然补一句，校区周边家长想了解孩子绘画阶段，可以带作品来让老师看一看。",
  },
  "抖音": {
    title: "孩子画得满满当当，是乱画还是有想法？",
    body: "剪辑节奏要快：完整作品 2 秒开场，马上切孩子手部作画、老师指导、细节特写。口播只讲一个观点：画面东西多，有时说明孩子正在练习组织想法。结尾带同城体验课。",
  },
  "视频号": {
    title: "这张作品里，最珍贵的不是画得满，而是孩子有故事",
    body: "视频号要更像老师日常分享。画面保留课堂真实声音，配温和口播：孩子画画不是为了赶紧画得像，而是在学习观察、表达和组织画面。适合家长转发给家人看。",
  },
};

const videoTypeScripts = {
  "老师理念口播型": "很多家长看到孩子画得很满，会担心是不是太乱了。但在美术课里，我们会先看孩子有没有在组织画面。下一步要做的不是急着改，而是帮他学会主次、空间和表达顺序。",
  "课堂氛围记录型": "今天课堂里最好的瞬间，是孩子一边画一边讲自己的想法。这样的过程比最后画得像不像更重要，因为孩子正在把观察、表达和专注放在一起。",
  "作品展示点评型": "这张作品可以重点看三个地方：角色有没有区分，空间有没有层次，故事有没有线索。如果这三点已经出现，说明孩子已经进入主题创作的阶段。",
  "家长痛点引导型": "孩子画得慢、画得满、画得不像，不一定是问题。老师更关心的是孩子有没有观察、有没有表达、有没有愿意把一个想法坚持画完。",
  "招生体验转化型": "如果孩子平时也喜欢画很多细节，可以带一张作品来体验课。老师会先看孩子现在的表达阶段，再决定下一步适合练构图、色彩还是故事组织。",
};

const activityExamples = {
  child: {
    topic: "绘画潜能倾向测评",
    age: "5-6 岁",
    highlight: "家长上传孩子作品后，系统从色彩敏感度、表达欲、想象力和画面组织能力生成报告，并推荐试听课。",
  },
  adult: {
    topic: "成人零基础水彩沙龙",
    age: "成人",
    highlight: "面向白领、宝妈和兴趣学习者，主打放松、审美提升和社交体验，适合周末下午开设。",
  },
  elder: {
    topic: "银发水墨花卉兴趣课",
    age: "退休人群",
    highlight: "面向社区老年学员，强调低门槛、慢节奏、作品成就感和线下社交。",
  },
  company: {
    topic: "公司年会艺术体验活动",
    age: "企业团队",
    highlight: "为企业年会、团建和员工关怀设计艺术共创体验，包含活动流程、报价和现场物料建议。",
  },
};

const generateButton = document.querySelector("#generateContent");
const platformSelect = document.querySelector("#platformSelect");
const videoTypeSelect = document.querySelector("#videoTypeSelect");
const topicInput = document.querySelector("#topicInput");
const ageSelect = document.querySelector("#ageSelect");
const highlightInput = document.querySelector("#highlightInput");
const contentTitle = document.querySelector("#contentTitle");
const contentBody = document.querySelector("#contentBody");

generateButton?.addEventListener("click", () => {
  const platform = platformSelect.value;
  const example = contentExamples[platform];
  const videoType = videoTypeSelect.value;
  const topic = topicInput.value.trim();
  const age = ageSelect.value;
  const highlight = highlightInput.value.trim();

  contentTitle.textContent = example.title;
  const audience = ["成人", "退休人群", "企业团队"].includes(age) ? age : `${age}孩子`;
  contentBody.textContent = `${topic}适合${audience}。${highlight} ${videoTypeScripts[videoType]} ${example.body}`;
});

document.querySelectorAll("[data-activity]").forEach((button) => {
  button.addEventListener("click", () => {
    const preset = activityExamples[button.dataset.activity];
    if (!preset) return;

    topicInput.value = preset.topic;
    ageSelect.value = Array.from(ageSelect.options).some((option) => option.value === preset.age)
      ? preset.age
      : "9-12 岁";
    highlightInput.value = preset.highlight;
    switchView("content");
  });
});
