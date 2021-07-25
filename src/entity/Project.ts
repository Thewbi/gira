import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Task } from "./Task";

@Entity("project")
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectname: string;

  @Column()
  description: string;

  @ManyToMany((type) => Task, (task) => task.projects, {
    eager: false,
  })
  tasks: Promise<Task[]>;
}
