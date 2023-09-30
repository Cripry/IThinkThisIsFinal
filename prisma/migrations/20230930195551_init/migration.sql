-- CreateTable
CREATE TABLE "TurbineData" (
    "record_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wind_speed" DOUBLE PRECISION NOT NULL,
    "rotor_speed" DOUBLE PRECISION NOT NULL,
    "active_power_awg" DOUBLE PRECISION NOT NULL,
    "nacelle_position" DOUBLE PRECISION NOT NULL,
    "feature_1" DOUBLE PRECISION NOT NULL,
    "feature_3" DOUBLE PRECISION NOT NULL,
    "feature_7" DOUBLE PRECISION NOT NULL,
    "feature_28" DOUBLE PRECISION NOT NULL,
    "day_sin" DOUBLE PRECISION NOT NULL,
    "day_cos" DOUBLE PRECISION NOT NULL,
    "year_sin" DOUBLE PRECISION NOT NULL,
    "year_cos" DOUBLE PRECISION NOT NULL,
    "hour_sin" DOUBLE PRECISION NOT NULL,
    "hours_cos" DOUBLE PRECISION NOT NULL,
    "minute_sin" DOUBLE PRECISION NOT NULL,
    "minute_cos" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TurbineData_record_time_key" ON "TurbineData"("record_time");
