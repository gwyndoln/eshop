import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Order } from './Order';
import { Comment } from './Comment';
import { Rating } from './Rating';

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

	@Column({ type: DataType.STRING(200) })
	address?: string;

	@HasMany(() => Comment)
	comments?: Comment | Comment[];

	@HasMany(() => Order)
	orders?: Order | Order[];

	@HasMany(() => Rating)
	ratings?: Rating | Rating[];
}
