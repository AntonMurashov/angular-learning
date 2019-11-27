import { OrderByPipe } from './order-by.pipe';
import { Sort } from '../enums/sort.enum';
import { Consts } from '../consts/consts';

describe('OrderByPipe', () => {
  let pipe = new OrderByPipe();
  let items = [{
    id: 1,
    title: "title",
    creationDate: new Date(),
    durationMin: 0,
    description: "description",
    topRated: true
  },
  {
    id: 2,
    title: "title",
    creationDate: new Date(new Date().getTime() + 1 * Consts.HRS_IN_DAY * Consts.MIN_IN_HOUR * Consts.SEC_IN_MIN * Consts.MSEC_IN_SEC),
    durationMin: 0,
    description: "description",
    topRated: true
  },
  {
    id: 3,
    title: "title",
    creationDate: new Date(new Date().getTime() - 15 * Consts.HRS_IN_DAY * Consts.MIN_IN_HOUR * Consts.SEC_IN_MIN * Consts.MSEC_IN_SEC),
    durationMin: 0,
    description: "description",
    topRated: true
  }];
  let initialItems = JSON.parse(JSON.stringify(items));
  
  it('items are ordered ASC by default', () => {
    let transformedItems = pipe.transform(items, 'creationDate');
    expect(transformedItems[0].id).toBe(initialItems[2].id);
    expect(transformedItems[1].id).toBe(initialItems[0].id);
    expect(transformedItems[2].id).toBe(initialItems[1].id);
  });
  
  it('items are ordered DESC if specified', () => {
    let transformedItems = pipe.transform(items, 'creationDate', Sort.desc);
    expect(transformedItems[0].id).toBe(initialItems[1].id);
    expect(transformedItems[1].id).toBe(initialItems[0].id);
    expect(transformedItems[2].id).toBe(initialItems[2].id);
  });
});
