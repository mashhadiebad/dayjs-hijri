import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)
dayjs.calendar('hijri')

test('subtract 1 ms', () => {
    const date = dayjs('1446-07-19', { hijri: true })
    const date2 = date.subtract(1, 'ms')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(date.date() - 1)
    expect(date2.$ms).toEqual(999)
})

test('subtract 1 day in the middle of the month', () => {
    const date = dayjs('1446-07-14', { hijri: true })
    const date2 = date.subtract(1, 'day')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(date.date() - 1)
})

test('subtract 1 day in the beginning of the month', () => {
    const date = dayjs('1446-07-01', { hijri: true })
    const date2 = date.subtract(1, 'day')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month() - 1)
    expect(date2.date()).toEqual(29)
})

test('subtract 1 month in the middle of the year', () => {
    const date = dayjs('1446-06-14', { hijri: true })
    const date2 = date.subtract(1, 'month')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month() - 1)
    expect(date2.date()).toEqual(date.date())
})


test('subtract 18 months', () => {
    const date = dayjs('1446-06-14', { hijri: true })
    const date2 = date.subtract(18, 'month')
    expect(date2.year()).toEqual(1444)
    expect(date2.month()).toEqual(11)
    expect(date2.date()).toEqual(date.date())
})

test('subtract 17 months', () => {
    const date = dayjs('1446-06-14', { hijri: true })
    const date2 = date.subtract(17, 'month')
    expect(date2.year()).toEqual(1444)
    expect(date2.month()).toEqual(0)
    expect(date2.date()).toEqual(date.date())
})

test('subtract 1 month in the beginning of the year', () => {
    const date = dayjs('1446-01-14', { hijri: true })
    const date2 = date.subtract(1, 'month')
    expect(date2.year()).toEqual(1445)
    expect(date2.month()).toEqual(11)
    expect(date2.date()).toEqual(date.date())
})

test('subtract 1 year', () => {
    const date = dayjs('1446-06-14', { hijri: true })
    const date2 = date.subtract(1, 'year')
    expect(date2.year()).toEqual(1445)
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(date.date())
})