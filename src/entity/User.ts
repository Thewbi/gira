import {Transform} from 'class-transformer'
import {Entity, PrimaryGeneratedColumn, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class User {

    // @ObjectIdColumn()
    // id: ObjectID;

  //   @ObjectIdColumn()
  // @Transform((id: ObjectID) => id.toHexString(), {toPlainOnly: true})
  // id: ObjectID

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
