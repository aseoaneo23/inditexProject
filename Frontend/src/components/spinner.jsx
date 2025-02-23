import { ProgressSpinner } from "primereact/progressspinner";

export const Spinner = () => {
    return (
        <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".3s"
        />
    );
};
