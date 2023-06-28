export type PageType = {
  id: string;
  reference: string;
  path: string | null;
  icon: string;
  title: string;
  createdAt: Date;
};

export type WorkspaceProps = {
  id: string;
  name: string;
  icon: string;
  members: string[];
  pages: PageType[];
  createdAt: Date;
  updatedAt?: Date;
};

export class Workspace {
  public readonly id: string;

  public readonly name: string;

  public readonly icon: string;

  public readonly members: string[];

  public readonly pages: PageType[];

  public readonly createdAt: Date;

  public readonly updatedAt?: Date;

  constructor(props: WorkspaceProps) {
    this.id = props.id;
    this.name = props.name;
    this.icon = props.icon;
    this.members = props.members;
    this.pages = props.pages;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
