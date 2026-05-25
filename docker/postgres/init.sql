-- Инициализация базы данных для журнала работ

-- Создание расширения для UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создание таблицы видов работ (справочник)
CREATE TABLE IF NOT EXISTS work_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    unit VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы журнала работ
CREATE TABLE IF NOT EXISTS work_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_date DATE NOT NULL,
    work_type_id UUID NOT NULL REFERENCES work_types(id) ON DELETE RESTRICT,
    quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
    worker_name VARCHAR(200) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_work_logs_date ON work_logs(work_date);
CREATE INDEX IF NOT EXISTS idx_work_logs_work_type ON work_logs(work_type_id);
CREATE INDEX IF NOT EXISTS idx_work_logs_worker ON work_logs(worker_name);

-- Триггер для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_work_types_updated_at 
    BEFORE UPDATE ON work_types 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_logs_updated_at 
    BEFORE UPDATE ON work_logs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Заполнение справочника видов работ
INSERT INTO work_types (name, description, unit) VALUES
    ('Кладка перегородок', 'Кладка кирпичных и блочных перегородок', 'м²'),
    ('Монтаж опалубки', 'Установка опалубки для бетонных работ', 'м²'),
    ('Бетонирование', 'Заливка бетона в опалубку', 'м³'),
    ('Армирование', 'Установка арматурного каркаса', 'т'),
    ('Кровельные работы', 'Устройство кровли', 'м²'),
    ('Отделочные работы', 'Внутренняя отделка помещений', 'м²'),
    ('Электромонтаж', 'Прокладка электрических сетей', 'м'),
    ('Сантехнические работы', 'Установка сантехнического оборудования', 'шт'),
    ('Остекление', 'Установка окон и стеклопакетов', 'м²'),
    ('Фасадные работы', 'Отделка фасада здания', 'м²')
ON CONFLICT (name) DO NOTHING;