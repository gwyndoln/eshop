import { User } from './User';
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
export class Comment extends Model {
	@Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
	uuid!: string;

	@Column({ type: DataType.STRING(1000), allowNull: false })
	text!: string;

	@Column({
		type: DataType.STRING(400),
		set(value: string[]) {
			this.setDataValue('images', value.join(';'));
		},
		get() {
			const images: string = this.getDataValue('images');

			if (!images) {
				return null;
			}

			return images.split(';');
		},
	})
	images?: string[];

	@Column({
		type: DataType.STRING(400),
		set(value: string[]) {
			this.setDataValue('videos', value.join(';'));
		},
		get() {
			const videos: string = this.getDataValue('videos');

			if (!videos) {
				return null;
			}

			return videos.split(';');
		},
	})
	videos?: string[];

	@Column({ defaultValue: 0, allowNull: false })
	likes!: number;

	@ForeignKey(() => Comment)
	@Column
	mainCommentId?: number;

	@BelongsTo(() => Comment)
	mainComment?: Comment;

	@HasMany(() => Comment)
	subComments?: Comment[];

	@ForeignKey(() => User)
	@Column({ allowNull: false })
	userId!: number;

	@BelongsTo(() => User)
	user!: User;

	@ForeignKey(() => Product)
	@Column({ allowNull: false })
	productId!: number;

	@BelongsTo(() => Product)
	product!: Product;
}
