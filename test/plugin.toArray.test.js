import dayjs from 'dayjs'
import toArray from 'dayjs/plugin/toArray'
import hijri from '../src'

dayjs.extend(toArray)
dayjs.extend(hijri)
dayjs.calendar('hijri')

test('Convert date to array', () => {
    const date = dayjs('2025-01-19').calendar('gregory')
    expect(date.toArray()).toEqual([2025, 0, 19, 0, 0, 0, 0])
})

test('Convert date to array', () => {
    const date = dayjs('1446-07-19', { hijri: true })
    expect(date.toArray()).toEqual([1446, 6, 19, 0, 0, 0, 0])
})