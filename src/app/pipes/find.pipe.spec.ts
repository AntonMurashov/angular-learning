import { FindPipe } from './find.pipe';

describe('FindPipe', () => {
  let pipe = new FindPipe();
  let items = [{
    id: 1,
    title: "title1",
    creationDate: new Date(),
    durationMin: 0,
    description: "description",
    topRated: true
  },
  {
    id: 2,
    title: "title2",
    creationDate: new Date(),
    durationMin: 0,
    description: "description",
    topRated: true
  },
  {
    id: 3,
    title: "caption3",
    creationDate: new Date(),
    durationMin: 0,
    description: "description",
    topRated: true
  }];
  let initialItems = JSON.parse(JSON.stringify(items));
  
  it('finds items', () => {
    expect(pipe.transform(items, 'title').length).toBe(2);
  });
});
