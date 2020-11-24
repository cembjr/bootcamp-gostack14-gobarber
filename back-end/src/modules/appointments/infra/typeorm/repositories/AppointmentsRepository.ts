import { getRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default class AppointmentsRepository implements IAppointmentRepository {
  private _repository: Repository<Appointment>;

  constructor() {
    this._repository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this._repository.create({ provider_id, date });
    await this._repository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment> {
    const findAppointment = await this._repository.findOne({
      where: { date },
    });

    return findAppointment as Appointment;
  }
}
