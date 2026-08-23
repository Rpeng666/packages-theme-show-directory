export const zh = {
  list: {
    title: '外链管理',
    empty: '暂无外链。',
    buttons: {
      add: '添加外链',
      delete: '删除',
      edit: '编辑',
      check: '检查反链',
      revalidate: '刷新缓存',
    },
  },
  add: {
    title: '添加外链',
    buttons: { submit: '创建' },
  },
  edit: {
    title: '编辑外链',
    buttons: { submit: '保存' },
  },
  check: {
    title: '检查反链',
  },
  fields: {
    target_url: '目标链接',
    target_url_tip: '要链接到的网址。如已粘贴徽章 HTML 则自动填充。',
    anchor_text: '锚文本',
    anchor_text_tip: '链接文字，爬虫可见（1-200 字符）。徽章链接可不填。',
    placement: '展示位置',
    placement_tip: '链接在 HTML 中的展示位置',
    status: '状态',
    created_at: '创建时间',
    badge_html: '徽章 HTML',
    badge_html_tip: '在此粘贴完整的徽章 HTML 代码，下方字段将自动填充。',
    reciprocal_url: '反链检查地址',
    reciprocal_url_tip: '对方网站上链接到我们的页面地址。留空则使用目标链接。',
    reciprocal_status: '反链状态',
    link_rel: '链接类型',
    last_checked: '最后检查',
  },
  options: {
    home: '首页',
    partner: 'Partner 页',
    all: '全部页面',
    active: '启用',
    paused: '暂停',
    footer: '底部滚动',
  },
};

export default zh;
