import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)
dayjs.calendar('hijri')

it('Extend dayjs', () => {
    expect(dayjs.$C).toBeDefined()
    expect(dayjs.$C).toEqual('hijri')
    expect(dayjs().$hy).toBeDefined()
})

it('Setting calendar converts date', () => {
    const date = dayjs('1446-07-19', { hijri: true }).calendar('gregory')
    expect(date.$y).toEqual(2025)
    expect(date.$M).toEqual(0)
    expect(date.$D).toEqual(19)

    const date2 = dayjs('2025-01-19').calendar('hijri')
    expect(date2.$hy).toEqual(1446)
    expect(date2.$hM).toEqual(6)
    expect(date2.$hD).toEqual(19)
})

test('keep instance calendar on manipulation', () => {
    const date = dayjs().calendar('hijri')
    expect(date.add(1, 'month').isHijri()).toEqual(true)
    expect(dayjs(date).startOf('month').$C).toEqual('hijri')
    expect(dayjs(date).add(1, 'month').$C).toEqual('hijri')
    expect(dayjs(date).add(1, 'month').add(1, 'month').isHijri()).toEqual(true)
})
