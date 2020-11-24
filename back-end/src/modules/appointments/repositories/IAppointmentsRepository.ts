import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentRepository {
  findByDate(date: Date): Promise<Appointment>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
