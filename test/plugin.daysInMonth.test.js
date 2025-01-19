import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)
dayjs.calendar('hijri')

it('dayInMonth, months with 30 days', () => {
    expect(dayjs('1446/09/13', { hijri: true }).daysInMonth()).toEqual(30)
    expect(dayjs('1446/06/13', { hijri: true }).daysInMonth()).toEqual(30)
    expect(dayjs('1446/05/13', { hijri: true }).daysInMonth()).toEqual(30)
    expect(dayjs('1446/03/13', { hijri: true }).daysInMonth()).toEqual(30)
    expect(dayjs('1446/02/13', { hijri: true }).daysInMonth()).toEqual(30)
    expect(dayjs('1446/01/13', { hijri: true }).daysInMonth()).toEqual(30)
})

it('dayInMonth, months with 29 days', () => {
    expect(dayjs('1446/12/13', { hijri: true }).daysInMonth()).toEqual(29)
    expect(dayjs('1446/11/13', { hijri: true }).daysInMonth()).toEqual(29)
    expect(dayjs('1446/10/13', { hijri: true }).daysInMonth()).toEqual(29)
    expect(dayjs('1446/08/13', { hijri: true }).daysInMonth()).toEqual(29)
    expect(dayjs('1446/07/13', { hijri: true }).daysInMonth()).toEqual(29)
    expect(dayjs('1446/04/13', { hijri: true }).daysInMonth()).toEqual(29)
})