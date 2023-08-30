import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm"

@Entity()
export class CovidCase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: string

  constructor (userId: string) {
    super()
    this.userId = userId
  }
}