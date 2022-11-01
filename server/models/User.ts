import { Comment } from './Comment';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

@Table
export class User extends Model {
	@Column({
		defaultValue: DataType.UUIDV4,
		type: DataType.UUID,
	})
	uuid!: string;

	@Column({ allowNull: false, unique: 'email' })
	email!: string;

	@Column({ type: DataType.STRING(60), allowNull: false })
	password!: string;

	@Column({ defaultValue: false })
	confirmed!: boolean;

	@Column({ defaultValue: false })
	isAdmin!: boolean;

	@HasMany(() => Comment, { foreignKey: 'userId' })
	comments?: Comment;
}
