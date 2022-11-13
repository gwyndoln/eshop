import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { Product } from './Product';

@Table
export class Type extends Model {
	@Column({ type: DataType.STRING(50), allowNull: false })
	title!: string;

	@ForeignKey(() => Type)
	@Column
	subTypeId?: number;

	@BelongsTo(() => Type)
	mainType?: Type;

	@HasMany(() => Type)
	subTypes?: Type | Type[];

	@HasMany(() => Product)
	products!: Product | Product[];
}
