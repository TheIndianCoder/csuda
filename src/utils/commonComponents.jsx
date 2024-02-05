import React, { Component } from 'react'
import { ColorRing } from 'react-loader-spinner'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { NavLink } from 'react-router-dom'
import { Button, Typography } from '@material-tailwind/react'

function ColorRingCustom() {
    return (
        <>
            <div className="m-auto w-16 h-16">
                <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}

                />
            </div>
        </>
    )
}

const NotFoundErrorMessageCustom = ({ message, text_size }) => {
    return (
        <p className={`text-center font-semibold text-${text_size} text-red-700`}>
            {message}
        </p>
    )
}

const InfoMessageCustom = ({ message, text_size }) => {
    return (
        <p className={`text-center font-semibold text-${text_size} text-yellow-900`}>
            {message}
        </p>
    )
}

const SuccessMessageCustom = ({ message, text_size }) => {
    return (
        <p className={`text-center font-semibold text-${text_size} text-green-700`}>
            {message}
        </p>
    )
}

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const ExportToExcel = ({ excelData, filaName, btnText }) => {
    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };


    return (
        <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-center ">
            <div className="p-4 min-w-fit max-w-fit">
                <button type='button'
                    onClick={() => exportToCSV(excelData, filaName)}
                    className="w-32 h-8  tracking-wide text-white text-xs font-bold transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">
                    {btnText}
                </button>
            </div>

        </div>
    )
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError = () => {
        return {
            hasError: true
        }
    }
    componentDidCatch = (error, info) => {
        console.error(error)
        console.error(info)
    }
    render() {
        if (this.state.hasError == true) {
            console.log("inside error return")
            return this.props.errorComponent
        }
        return this.props.children
    }
}

const AccordionListComponent = ({
    name, layout, path, sidenavColor, sidenavType
}) => {
    return (
        <li key={name}>
            <NavLink to={`/dashboard/${layout}${path}`}>
                {({ isActive }) => (
                    <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                            isActive
                                ? sidenavColor
                                : sidenavType === "dark"
                                    ? "white"
                                    : "dark-red"
                        }
                        className="flex items-center gap-4 px-4 capitalize relative"
                        fullWidth
                    >
                        <Typography
                            color="inherit"
                            className="font-medium capitalize text-xs"
                        >
                            {name}
                        </Typography>
                    </Button>
                )}
            </NavLink>
        </li>
    )
}

export {
    ColorRingCustom,
    NotFoundErrorMessageCustom,
    ExportToExcel,
    InfoMessageCustom,
    ErrorBoundary,
    SuccessMessageCustom,
    AccordionListComponent
} 