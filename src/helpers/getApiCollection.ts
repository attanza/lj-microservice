import { Model } from 'mongoose';
import { ResourcePagination } from 'src/shared/interfaces/resource-pagination.interface';
import {
  IApiCollection,
  IMeta,
} from 'src/shared/interfaces/response-parser.interface';

export default async (
  modelName: string,
  model: Model<any>,
  query?: ResourcePagination,
  searchable?: string[],
): Promise<IApiCollection> => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 2;
  const sortBy = query.sortBy || 'createdAt';
  const sortMode = Number(query.sortMode) || 1;
  const search = query.search || '';
  let options = {};
  if (search !== '' && searchable.length > 0) {
    searchable.map(s => {
      options = { ...options, [s]: { $regex: search, $options: 'i' } };
    });
  }
  const totalDocs: number = await model.countDocuments(options);
  const totalPages: number = Math.ceil(totalDocs / limit);
  const meta: IMeta = {
    status: 200,
    message: `${modelName} Collection`,
    totalDocs,
    limit,
    page,
    totalPages,
    nextPage: totalPages > page ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };
  const data = await model
    .find(options)
    .sort({ [sortBy]: sortMode })
    .skip(limit * page - limit)
    .limit(limit);
  return { meta, data };
};
