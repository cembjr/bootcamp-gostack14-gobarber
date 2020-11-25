import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const _repository = new FakeAppointmentRepository();

    const createAppointmentService = new CreateAppointmentService(_repository);

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two new appointments on the same time', async () => {
    const _repository = new FakeAppointmentRepository();
    const date = new Date(2020, 4, 10, 11);

    const createAppointmentService = new CreateAppointmentService(_repository);

    await createAppointmentService.execute({
      date,
      provider_id: '123123123',
    });

    expect(
      createAppointmentService.execute({
        date,
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
