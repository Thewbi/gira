import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Project } from "./Project";

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany((type) => Project, (project) => project.tasks, {
    cascade: true,
  })
  @JoinTable()
  projects: Project[];
}
