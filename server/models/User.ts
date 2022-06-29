import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
	userId!: string;

	@Column({ allowNull: false, unique: 'email' })
	email!: string;

	@Column({ defaultValue: false })
	confirmed!: boolean;

	@Column({ allowNull: false })
	password!: string;

	@Column({ defaultValue: false })
	isAdmin!: boolean;
}
