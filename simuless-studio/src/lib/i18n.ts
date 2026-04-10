import type { Language } from "@/types/graph";

export const translations = {
  en: {
    // Sidebar
    "sidebar.nodeLibrary": "Node Library",
    "sidebar.graph": "Graph",
    "sidebar.code": "Code",
    "sidebar.settings": "Settings",

    // Top Bar
    "topbar.file": "File",
    "topbar.edit": "Edit",
    "topbar.view": "View",
    "topbar.run": "Run",
    "topbar.debug": "Debug",
    "topbar.help": "Help",
    "topbar.play": "Play",
    "topbar.stop": "Stop",
    "topbar.save": "Save",
    "topbar.open": "Open",
    "topbar.newFile": "New File",
    "topbar.settings": "Settings",
    "topbar.toggleDarkMode": "Toggle Dark Mode",
    "topbar.toggleLanguage": "切换语言",

    // Property Panel
    "property.title": "Properties",
    "property.selectNode": "Select a node to view its properties",
    "property.label": "Label",
    "property.type": "Type",
    "property.position": "Position",
    "property.delete": "Delete Node",

    // Canvas
    "canvas.nodesPlaceholder": "Drag nodes here or double-click to create",
    "canvas.connectNodes": "Drag to connect nodes",

    // Console
    "console.title": "Console",
    "console.clear": "Clear",
    "console.ready": "Studio ready",

    // Nodes
    "node.gain": "Gain",
    "node.integrator": "Integrator",
    "node.differentiator": "Differentiator",
    "node.sum": "Sum",
    "node.scope": "Scope",
    "node.input": "Input",
    "node.output": "Output",

    // Messages
    "msg.success": "Success",
    "msg.error": "Error",
    "msg.warning": "Warning",
    "msg.deleteNode": "Delete this node?",
    "msg.unsavedChanges": "You have unsaved changes",
  },
  zh: {
    // Sidebar
    "sidebar.nodeLibrary": "节点库",
    "sidebar.graph": "流程图",
    "sidebar.code": "代码",
    "sidebar.settings": "设置",

    // Top Bar
    "topbar.file": "文件",
    "topbar.edit": "编辑",
    "topbar.view": "视图",
    "topbar.run": "运行",
    "topbar.debug": "调试",
    "topbar.help": "帮助",
    "topbar.play": "播放",
    "topbar.stop": "停止",
    "topbar.save": "保存",
    "topbar.open": "打开",
    "topbar.newFile": "新建文件",
    "topbar.settings": "设置",
    "topbar.toggleDarkMode": "切换深色模式",
    "topbar.toggleLanguage": "Toggle Language",

    // Property Panel
    "property.title": "属性",
    "property.selectNode": "选择节点以查看其属性",
    "property.label": "标签",
    "property.type": "类型",
    "property.position": "位置",
    "property.delete": "删除节点",

    // Canvas
    "canvas.nodesPlaceholder": "将节点拖到这里或双击创建",
    "canvas.connectNodes": "拖动以连接节点",

    // Console
    "console.title": "控制台",
    "console.clear": "清除",
    "console.ready": "工作室已就绪",

    // Nodes
    "node.gain": "增益",
    "node.integrator": "积分器",
    "node.differentiator": "微分器",
    "node.sum": "求和",
    "node.scope": "示波器",
    "node.input": "输入",
    "node.output": "输出",

    // Messages
    "msg.success": "成功",
    "msg.error": "错误",
    "msg.warning": "警告",
    "msg.deleteNode": "确定删除此节点？",
    "msg.unsavedChanges": "您有未保存的更改",
  },
};

export type TranslationKey = keyof typeof translations.en;

export const t = (key: TranslationKey, language: Language): string => {
  return translations[language][key] || translations.en[key] || key;
};
