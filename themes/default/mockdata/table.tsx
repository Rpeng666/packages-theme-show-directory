import type { Section } from "@template/ui";

export const props = {
    columns: [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "role", title: "Role", dataIndex: "role" },
    ],
    dataSource: [
      { key: "1", name: "Ada Lovelace", role: "Mathematician" },
      { key: "2", name: "Grace Hopper", role: "Computer scientist" },
    ],
  };
