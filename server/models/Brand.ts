import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from './Product';

@Table
export class Brand extends Model {
	@Column({ type: DataType.STRING(50), allowNull: false, unique: 'title' })
	title!: string;

	@HasMany(() => Product)
	products!: Product | Product[];
}
