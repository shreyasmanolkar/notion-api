export type PageType = {
  reference: string;
  path: string;
  children: Record<string, PageType> | object;
};
export type WorkspaceProps = {
  id: string;
  name: string;
  icon: string;
  members: string[];
  page: PageType[];
  createdAt: Date;
  updatedAt?: Date;
};

export class Workspace {
  public readonly id: string;

  public readonly name: string;

  public readonly icon: string;

  public readonly members: string[];

  public readonly page: PageType[];

  public readonly createdAt: Date;

  public readonly updatedAt?: Date;

  constructor(props: WorkspaceProps) {
    this.id = props.id;
    this.name = props.name;
    this.icon = props.icon;
    this.members = props.members;
    this.page = props.page;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
