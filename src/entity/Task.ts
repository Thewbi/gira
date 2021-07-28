import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Project } from "./Project";

export enum TaskState {
  UNKNOWN = "UNKNOWN",
}

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  state: string;

  @ManyToMany((type) => Project, (project) => project.tasks, {
    cascade: true,
  })
  @JoinTable()
  projects: Project[];
}
