import * as React from "react";
import {DefaultPage} from "../../defaultPage/DefaultPage";
import TextField from "@material-ui/core/TextField";
import {useState} from "react";
import Button from "@material-ui/core/Button";
import {UserEditMode} from "../../userPage/userEdit/UserEdit";
import {UserType} from "../../../../reducers/Types";
import $ from "jquery";
import {GET_USERS_URL} from "../../userPage/UserService";
import {saveSchedule} from "../ScheduleService";
import {useStore} from "../../../../reducers/RootReducer";

export interface ScheduleCreateData {
    timeFrom: string;
    timeTo: string;
    visitDuration: string;
    date: string;
    employeeId: string;
}

export const getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
};

export const ScheduleCreate: React.FC = () => {
    const [state, dispatch] = [useStore().state, useStore().dispatch];

    const [data, setData] = useState<ScheduleCreateData>({
        timeFrom: '08:00',
        timeTo: '16:00',
        visitDuration: '30',
        date: getToday(),
        employeeId: state.id
    });

    return (
      <DefaultPage
          headerText={'Create Schedule'}
          component={
              <div>
                  <TextField
                      variant="outlined"
                      type='date'
                      margin="normal"
                      fullWidth
                      id="date"
                      label="Date"
                      name="date"
                      autoFocus
                      defaultValue={data.date}
                      onChange={(event) => {
                          setData({
                              ...data,
                              date: event.target.value
                          });
                      }}
                  />
                  <TextField
                      variant="outlined"
                      type='time'
                      margin="normal"
                      fullWidth
                      id="timeFrom"
                      label="Start Time"
                      name="timeFrom"
                      autoFocus
                      defaultValue={data.timeFrom}
                      onChange={(event) => {
                          setData({
                              ...data,
                              timeFrom: event.target.value
                          });
                      }}
                  />
                  <TextField
                      variant="outlined"
                      type='time'
                      margin="normal"
                      fullWidth
                      id="timeTo"
                      label="End Time"
                      name="timeTo"
                      autoFocus
                      defaultValue={data.timeTo}
                      onChange={(event) => {
                          setData({
                              ...data,
                              timeTo: event.target.value
                          });
                      }}
                  />
                  <TextField
                      variant="outlined"
                      margin="normal"
                      type="number"
                      fullWidth
                      id="visitDuration"
                      label="Visit Duration"
                      name="visitDuration"
                      autoFocus
                      defaultValue={data.visitDuration}
                      onChange={(event) => {
                          setData({
                              ...data,
                              visitDuration: event.target.value
                          });
                      }}
                  />
                  <div className={'flex'}>
                      <Button
                          variant="contained"
                          onClick={() => {
                              saveSchedule(data);
                          }}
                      >
                          Save
                      </Button>
                  </div>
              </div>

          }/>
    );
}