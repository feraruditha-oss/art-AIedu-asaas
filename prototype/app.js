const titles = {
  dashboard: "数据看板",
  acquisition: "获客活动中心",
  content: "内容生成工作台",
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
    title: "孩子画得很满，不一定是乱，可能是在努力讲故事",
    body: "很多家长看到这种画，第一反应是“东西好多，会不会太乱？”但从老师角度看，这里面其实藏着一个很重要的信号：孩子已经开始把角色、建筑、植物和活动放进同一个故事里。这个阶段继续只练“画得像”，反而有点可惜。更应该带他学会取舍主次、安排空间、把故事讲清楚。滨江区附近的家长，带孩子作品来体验课时，老师会先帮你看孩子现在卡在哪一步。",
  },
  "朋友圈": {
    title: "今天有张作品，越看越觉得孩子很有想法",
    body: "这张画不是简单把东西堆满。孩子在试着安排角色、建筑、花木和活动，这其实是主题创作很重要的一步。美术课真正有价值的地方，是让孩子从“我想画什么”慢慢走向“我怎么把它讲清楚”。校区周边的家长如果想了解孩子现在的绘画阶段，可以带作品来让老师现场看一看。",
  },
  "抖音": {
    title: "孩子画得满满当当，是乱画还是有想法？",
    body: "镜头 1：直接展示完整作品。镜头 2：放大角色、建筑、花木和桌面活动。镜头 3：老师口播，别急着说画面乱，孩子可能正在尝试组织一个完整故事。镜头 4：说清楚下一步，滨江区周边 3-5 公里家长，周末可以带作品来让老师现场看一看。",
  },
  "视频号": {
    title: "这张作品里，最珍贵的不是画得满，而是孩子有故事",
    body: "今天这张作品里有角色、有场景、有活动，也有孩子自己的审美选择。比起一句“画得不错”，老师更想看孩子是不是能把自己的想法讲清楚。附近社区和校区周边家长，如果孩子也喜欢画故事型作品，可以预约一次体验课，让老师现场看看下一步怎么引导。",
  },
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
const topicInput = document.querySelector("#topicInput");
const ageSelect = document.querySelector("#ageSelect");
const highlightInput = document.querySelector("#highlightInput");
const contentTitle = document.querySelector("#contentTitle");
const contentBody = document.querySelector("#contentBody");

generateButton?.addEventListener("click", () => {
  const platform = platformSelect.value;
  const example = contentExamples[platform];
  const topic = topicInput.value.trim();
  const age = ageSelect.value;
  const highlight = highlightInput.value.trim();

  contentTitle.textContent = example.title;
  const audience = ["成人", "退休人群", "企业团队"].includes(age) ? age : `${age}孩子`;
  contentBody.textContent = `${topic}适合${audience}。${highlight} ${example.body}`;
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
