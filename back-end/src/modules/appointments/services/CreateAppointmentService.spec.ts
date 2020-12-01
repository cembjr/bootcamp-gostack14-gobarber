import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let _fakeAppointmentRepository: IAppointmentRepository;
let _createAppointmentService: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    _fakeAppointmentRepository = new FakeAppointmentRepository();

    _createAppointmentService = new CreateAppointmentService(
      _fakeAppointmentRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await _createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two new appointments on the same time', async () => {
    const date = new Date(2020, 4, 10, 11);

    await _createAppointmentService.execute({
      date,
      provider_id: '123123123',
    });

    expect(
      _createAppointmentService.execute({
        date,
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
