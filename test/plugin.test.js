import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)
dayjs.calendar('hijri')

it('Extend dayjs', () => {
    expect(dayjs.$C).toBeDefined()
    expect(dayjs.$C).toEqual('hijri')
    expect(dayjs().$hy).toBeDefined()
})
