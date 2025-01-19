import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)
dayjs.calendar('hijri')

it('format', () => {
    expect(dayjs('2025/01/19').calendar('gregory').format('YYYY/MM/DD')).toEqual('2025/01/19')

    const date = dayjs('1446/07/19', { hijri: true })
    expect(date.format()).toContain('1446-07-19T00:00:00+')
    expect(date.format('[Unformatted text]')).toEqual('Unformatted text')
    expect(date.format('YY')).toEqual(String(46))
    expect(date.format('YYYY')).toEqual(String(1446))
    expect(date.format('M')).toEqual('7')
    expect(date.format('MM')).toEqual('07')
    expect(date.format('MMM')).toEqual('Raj')
    expect(date.format('MMMM')).toEqual('Rajab')
    expect(date.locale('ar').format('MMMM')).toEqual('رجب')
    expect(date.format('DD')).toEqual('19')
    expect(date.format('D')).toEqual('19')
    expect(date.format('W')).toEqual('W')
    expect(date.format('HH')).toEqual('00')
})