import { OrderByPipe } from './order-by.pipe';
import { Sort } from '../enums/sort.enum';
import { Consts } from '../consts/consts';

describe('OrderByPipe', () => {
  let pipe = new OrderByPipe();
  let items = [{
    id: 1,
    name: "name",
    date: new Date(),
    length: 0,
    description: "description",
    isTopRated: true
  },
  {
    id: 2,
    name: "name",
    date: new Date(new Date().getTime() + 1 * Consts.HRS_IN_DAY * Consts.MIN_IN_HOUR * Consts.SEC_IN_MIN * Consts.MSEC_IN_SEC),
    length: 0,
    description: "description",
    isTopRated: true
  },
  {
    id: 3,
    name: "name",
    date: new Date(new Date().getTime() - 15 * Consts.HRS_IN_DAY * Consts.MIN_IN_HOUR * Consts.SEC_IN_MIN * Consts.MSEC_IN_SEC),
    length: 0,
    description: "description",
    isTopRated: true
  }];
  let initialItems = JSON.parse(JSON.stringify(items));
  
  it('items are ordered ASC by default', () => {
    let transformedItems = pipe.transform(items, 'date');
    expect(transformedItems[0].id).toBe(initialItems[2].id);
    expect(transformedItems[1].id).toBe(initialItems[0].id);
    expect(transformedItems[2].id).toBe(initialItems[1].id);
  });
  
  it('items are ordered DESC if specified', () => {
    let transformedItems = pipe.transform(items, 'date', Sort.desc);
    expect(transformedItems[0].id).toBe(initialItems[1].id);
    expect(transformedItems[1].id).toBe(initialItems[0].id);
    expect(transformedItems[2].id).toBe(initialItems[2].id);
  });
});
