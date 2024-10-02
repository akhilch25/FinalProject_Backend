CREATE OR REPLACE FUNCTION update_performance_rate() 
RETURNS TRIGGER AS $$
BEGIN
    -- Update the performance_rate in the Employee table
    UPDATE "Employee"
    SET performance_rate = (
        SELECT AVG(ec.completion_rate)
        FROM "EmployeeCourse" ec
        WHERE ec."empID" = NEW."empID"  -- Ensure this matches the column name
    )
    WHERE "empID" = NEW."empID";  -- Ensure this matches the column name
    RETURN NEW;  -- Return the new row
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_update_performance_rate
AFTER INSERT OR UPDATE ON "EmployeeCourse"
FOR EACH ROW
EXECUTE FUNCTION update_performance_rate();
