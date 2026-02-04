// Use type-only imports so we can reference Collection/ObjectId/Db as types without pulling runtime mongodb
import type {
  Collection as MongoCollection,
  ObjectId as MongoObjectId,
  Db,
} from 'mongodb'

// Runtime shape of our MongoDB wrapper (from src/config/mongodb.config.ts)
type MongoRuntime = {
  connect: () => Promise<Db>
  getDb: () => Db
  client?: unknown
}

class MockObjectId {
  public id: string
  constructor(id?: string) {
    this.id = id || 'mock-object-id'
  }
  toString() {
    return this.id
  }
  toHexString() {
    return this.id
  }
}

// Use conditional imports to prevent MongoDB from being bundled on client side
let mongodb: MongoRuntime | null = null
let ObjectId: typeof MongoObjectId | typeof MockObjectId | null = null

let serverDepsPromise: Promise<void> | null = null

async function initializeDependencies() {
  if (serverDepsPromise) {
    return serverDepsPromise
  }
  if (typeof window === 'undefined') {
    serverDepsPromise = (async () => {
      try {
        const mod = await import('../config/mongodb.config')
        mongodb = mod.default as unknown as MongoRuntime
        const mongodbLib = await import('mongodb')
        ObjectId = mongodbLib.ObjectId
      } catch {
        mongodb = null
        ObjectId = MockObjectId
      }
    })()
  } else {
    mongodb = null
    ObjectId = MockObjectId
    serverDepsPromise = Promise.resolve()
  }
  return serverDepsPromise
}

// Export a helper to create ObjectId from string, which handles lazy loading
export async function createObjectId(id: string): Promise<MongoObjectId> {
  await initializeDependencies()
  return new ObjectId!(id)
}

import type {
  AIMetrics,
  AuditLog,
  BiasDetection,
  ConsentManagement,
  CrisisSessionFlag,
  Todo,
  TreatmentPlan,
  User,
  Session,
  DataExport,
} from '../types/mongodb.types'

export class DataExportDAO {
  private async getCollection(): Promise<MongoCollection<DataExport>> {
    await initializeDependencies()
    if (!mongodb) {
      throw new Error('MongoDB client not initialized')
    }
    const db = await mongodb.connect()
    return db.collection<DataExport>('data_exports')
  }

  async create(
    exportRequest: Omit<DataExport, '_id'>,
  ): Promise<DataExport> {
    const collection = await this.getCollection()
    // Ensure files is initialized
    const data = { ...exportRequest, files: exportRequest.files || [] }
    const result = await collection.insertOne(data as DataExport)
    const created = await collection.findOne({ _id: result.insertedId })

    if (!created) {
      throw new Error('Failed to create data export')
    }

    return created
  }

  async findById(id: string): Promise<DataExport | null> {
    const collection = await this.getCollection()
    const request = await collection.findOne({ id: id } as any)
    return request
  }

  async findByPatientId(patientId: string): Promise<DataExport[]> {
    const collection = await this.getCollection()
    const requests = await collection
      .find({ patientId: patientId } as any)
      .sort({ createdAt: -1 })
      .toArray()
    return requests
  }

  async findAll(filter: any = {}): Promise<DataExport[]> {
    const collection = await this.getCollection()
    const requests = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray()
    return requests
  }

  async update(
    id: string,
    updates: Partial<DataExport>,
  ): Promise<DataExport | null> {
    const collection = await this.getCollection()
    const { _id, ...safeUpdates } = updates
    const result = await collection.findOneAndUpdate(
      { id: id } as any,
      { $set: safeUpdates },
      { returnDocument: 'after' },
    )
    return result
  }

  async addFile(exportId: string, file: any): Promise<void> {
    const collection = await this.getCollection()
    await collection.updateOne({ id: exportId } as any, {
      $push: { files: file } as any,
    })
  }
}

export class UserDAO {
  private async getCollection(): Promise<MongoCollection<User>> {
    await initializeDependencies()
    if (!mongodb) {
      throw new Error('MongoDB client not initialized')
    }
    const db = await mongodb.connect()
    return db.collection<User>('users')
  }

  async findAll(): Promise<User[]> {
    const collection = await this.getCollection()
    const users = await collection.find({}).toArray()
    return users.map((user) => ({ ...user, id: user._id?.toString() }))
  }

  async deleteAll(): Promise<void> {
    const collection = await this.getCollection()
    await collection.deleteMany({})
  }

  async insertMany(users: User[]): Promise<void> {
    const collection = await this.getCollection()
    if (users.length > 0) {
      const processedUsers = users.map(user => {
         const u = { ...user } as any
         if (typeof u._id === 'string') {
             u._id = new ObjectId!(u._id)
         }
         return u
      })
      await collection.insertMany(processedUsers)
    }
  }
}

export class SessionDAO {
  private async getCollection(): Promise<MongoCollection<Session>> {
    await initializeDependencies()
    if (!mongodb) {
      throw new Error('MongoDB client not initialized')
    }
    const db = await mongodb.connect()
    return db.collection<Session>('sessions')
  }

  async findAll(): Promise<Session[]> {
    const collection = await this.getCollection()
    const sessions = await collection.find({}).toArray()
    return sessions
  }

  async deleteAll(): Promise<void> {
    const collection = await this.getCollection()
    await collection.deleteMany({})
  }

  async insertMany(sessions: Session[]): Promise<void> {
    const collection = await this.getCollection()
    if (sessions.length > 0) {
       const processed = sessions.map(session => {
         const s = { ...session } as any
         if (typeof s._id === 'string') s._id = new ObjectId!(s._id)
         if (typeof s.userId === 'string') s.userId = new ObjectId!(s.userId)
         return s
      })
      await collection.insertMany(processed)
    }
  }
}

export class TodoDAO {
  private async getCollection(): Promise<MongoCollection<Todo>> {
    await initializeDependencies()
    if (!mongodb) {
      throw new Error('MongoDB client not initialized')
    }
    const db = await mongodb.connect()
    return db.collection<Todo>('todos')
  }

  async findByUserId(userId: string): Promise<Todo[]> {
    const collection = await this.getCollection()
    const todos = await collection
      .find({ userId: new ObjectId!(userId) })
      .toArray()
    return todos.map((todo) => ({ ...todo, id: todo._id?.toString() }))
  }

  async deleteAll(): Promise<void> {
    const collection = await this.getCollection()
    await collection.deleteMany({})
  }

  async insertMany(todos: Todo[]): Promise<void> {
    const collection = await this.getCollection()
    if (todos.length > 0) {
      const processed = todos.map(item => {
         const obj = { ...item } as any
         if (typeof obj._id === 'string') obj._id = new ObjectId!(obj._id)
         if (typeof obj.userId === 'string') obj.userId = new ObjectId!(obj.userId)
         return obj
      })
      await collection.insertMany(processed)
    }
  }

  async findAll(): Promise<Todo[]> {
      const collection = await this.getCollection()
      const todos = await collection.find({}).toArray()
      return todos.map((todo) => ({ ...todo, id: todo._id?.toString() }))
  }
}

export class AIMetricsDAO {
  private async getCollection(): Promise<MongoCollection<AIMetrics>> {
    await initializeDependencies()
    if (!mongodb) {
      throw new Error('MongoDB client not initialized')
    }
    const db = await mongodb.connect()
    return db.collection<AIMetrics>('ai_metrics')
  }

  async create(metrics: Omit<AIMetrics, '_id'>): Promise<AIMetrics> {
    const collection = await this.getCollection()
    const result = await collection.insertOne(metrics)
    const createdMetrics = await collection.findOne({ _id: result.insertedId })

    if (!createdMetrics) {
      throw new Error('Failed to create AI metrics')
    }

    return { ...createdMetrics, id: createdMetrics._id?.toString() }
  }

  async findByUserId(userId: string, limit = 100): Promise<AIMetrics[]> {
    const collection = await this.getCollection()
    const metrics = await collection
      .find({ userId: new ObjectId!(userId) })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray()

    return metrics.map((metric) => ({ ...metric, id: metric._id?.toString() }))
  }

  async getUsageStats(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<{
    totalRequests: number
    totalTokens: number
    averageResponseTime: number
  }> {
    const collection = await this.getCollection()
    const pipeline = [
      {
        $match: {
          userId: new ObjectId!(userId),
          timestamp: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalRequests: { $sum: 1 },
          totalTokens: { $sum: '$tokensUsed' },
          averageResponseTime: { $avg: '$responseTime' },
        },
      },
    ]

    const result = await collection.aggregate(pipeline).toArray()
    const stats = result[0] as
      | {
          totalRequests: number
          totalTokens: number
          averageResponseTime: number
        }
      | undefined

    return stats || { totalRequests: 0, totalTokens: 0, averageResponseTime: 0 }
  }

  async deleteAll(): Promise<void> {
    const collection = await this.getCollection()
    await collection.deleteMany({})
  }

  async insertMany(metrics: AIMetrics[]): Promise<void> {
    const collection = await this.getCollection()
    if (metrics.length > 0) {
      const processed = metrics.map(item => {
         const obj = { ...item } as any
         if (typeof obj._id === 'string') obj._id = new ObjectId!(obj._id)
         if (typeof obj.userId === 'string') obj.userId = new ObjectId!(obj.userId)
         return obj
      })
      await collection.insertMany(processed)
    }
  }

  async findAll(): Promise<AIMetrics[]> {
      const collection = await this.getCollection()
      const metrics = await collection.find({}).toArray()
      return metrics.map((metric) => ({ ...metric, id: metric._id?.toString() }))
  }
}

export class BiasDetectionDAO {
  private async getCollection(): Promise<MongoCollection<BiasDetection>> {
    await initializeDependencies()
    if (!mongodb) {
      throw new Error('MongoDB dependency is null')
    }
    const db = await mongodb.connect()
    return db.collection<BiasDetection>('bias_detection')
  }

  async create(detection: Omit<BiasDetection, '_id'>): Promise<BiasDetection> {
    const collection = await this.getCollection()
    const result = await collection.insertOne(detection)
    const createdDetection = await collection.findOne({
      _id: result.insertedId,
    })

    if (!createdDetection) {
      throw new Error('Failed to create bias detection')
    }

    return { ...createdDetection, id: createdDetection._id?.toString() }
  }

  async findByUserId(userId: string, limit = 50): Promise<BiasDetection[]> {
    const collection = await this.getCollection()
    const detections = await collection
      .find({ userId: new ObjectId!(userId) })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray()

    return detections.map((detection) => ({
      ...detection,
      id: detection._id?.toString(),
    }))
  }

  async deleteAll(): Promise<void> {
    const collection = await this.getCollection()
    await collection.deleteMany({})
  }

  async insertMany(detections: BiasDetection[]): Promise<void> {
    const collection = await this.getCollection()
    if (detections.length > 0) {
      const processed = detections.map(item => {
         const obj = { ...item } as any
         if (typeof obj._id === 'string') obj._id = new ObjectId!(obj._id)
         if (typeof obj.userId === 'string') obj.userId = new ObjectId!(obj.userId)
         return obj
      })
      await collection.insertMany(processed)
    }
  }

  async findAll(): Promise<BiasDetection[]> {
      const collection = await this.getCollection()
      const detections = await collection.find({}).toArray()
      return detections.map((detection) => ({ ...detection, id: detection._id?.toString() }))
  }
}

export class TreatmentPlanDAO {
  private async getCollection(): Promise<MongoCollection<TreatmentPlan>> {
    await initializeDependencies()
    if (!mongodb) {
      throw new Error('MongoDB client not initialized')
    }
    const db = await mongodb.connect()
    return db.collection<TreatmentPlan>('treatment_plans')
  }

  async create(
    plan: Omit<TreatmentPlan, '_id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TreatmentPlan> {
    const collection = await this.getCollection()
    const newPlan: Omit<TreatmentPlan, '_id'> = {
      ...plan,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newPlan as TreatmentPlan)
    const createdPlan = await collection.findOne({ _id: result.insertedId })

    if (!createdPlan) {
      throw new Error('Failed to create treatment plan')
    }

    return { ...createdPlan, id: createdPlan._id?.toString() }
  }

  async findByUserId(userId: string): Promise<TreatmentPlan[]> {
    const collection = await this.getCollection()
    const plans = await collection
      .find({ userId: new ObjectId!(userId) })
      .sort({ createdAt: -1 })
      .toArray()

    return plans.map((plan) => ({ ...plan, id: plan._id?.toString() }))
  }

  async findByTherapistId(therapistId: string): Promise<TreatmentPlan[]> {
    const collection = await this.getCollection()
    const plans = await collection
      .find({ therapistId: new ObjectId!(therapistId) })
      .sort({ createdAt: -1 })
      .toArray()

    return plans.map((plan) => ({ ...plan, id: plan._id?.toString() }))
  }

  async update(
    id: string,
    updates: Partial<TreatmentPlan>,
  ): Promise<TreatmentPlan | null> {
    const collection = await this.getCollection()
    const { _id, id: _, ...safeUpdates } = updates

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId!(id) },
      { $set: { ...safeUpdates, updatedAt: new Date() } },
      { returnDocument: 'after' },
    )

    return result ? { ...result, id: result._id?.toString() } : null
  }

  async deleteAll(): Promise<void> {
    const collection = await this.getCollection()
    await collection.deleteMany({})
  }

  async insertMany(plans: TreatmentPlan[]): Promise<void> {
    const collection = await this.getCollection()
    if (plans.length > 0) {
      const processed = plans.map(item => {
         const obj = { ...item } as any
         if (typeof obj._id === 'string') obj._id = new ObjectId!(obj._id)
         if (typeof obj.userId === 'string') obj.userId = new ObjectId!(obj.userId)
         if (typeof obj.therapistId === 'string') obj.therapistId = new ObjectId!(obj.therapistId)
         return obj
      })
      await collection.insertMany(processed)
    }
  }

  async findAll(): Promise<TreatmentPlan[]> {
      const collection = await this.getCollection()
      const plans = await collection.find({}).toArray()
      return plans.map((plan) => ({ ...plan, id: plan._id?.toString() }))
  }
}

export class CrisisSessionFlagDAO {
  private async getCollection(): Promise<MongoCollection<CrisisSessionFlag>> {
    await initializeDependencies()
    if (!mongodb) {
      throw new Error('MongoDB client not initialized')
    }
    const db = await mongodb.connect()
    return db.collection<CrisisSessionFlag>('crisis_session_flags')
  }

  async create(
    flag: Omit<CrisisSessionFlag, '_id' | 'createdAt'>,
  ): Promise<CrisisSessionFlag> {
    const collection = await this.getCollection()
    const newFlag: Omit<CrisisSessionFlag, '_id'> = {
      ...flag,
      createdAt: new Date(),
    }

    const result = await collection.insertOne(newFlag as CrisisSessionFlag)
    const createdFlag = await collection.findOne({ _id: result.insertedId })

    if (!createdFlag) {
      throw new Error('Failed to create crisis session flag')
    }

    return { ...createdFlag, id: createdFlag._id?.toString() }
  }

  async findBySessionId(sessionId: string): Promise<CrisisSessionFlag[]> {
    const collection = await this.getCollection()
    const flags = await collection.find({ sessionId }).toArray()
    return flags.map((flag) => ({ ...flag, id: flag._id?.toString() }))
  }

  async resolveFlag(
    id: string,
    resolvedBy: string,
  ): Promise<CrisisSessionFlag | null> {
    const collection = await this.getCollection()
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId!(id) },
      {
        $set: {
          resolved: true,
          resolvedAt: new Date(),
          resolvedBy: new ObjectId!(resolvedBy),
        },
      },
      { returnDocument: 'after' },
    )

    return result ? { ...result, id: result._id?.toString() } : null
  }

  async deleteAll(): Promise<void> {
    const collection = await this.getCollection()
    await collection.deleteMany({})
  }

  async insertMany(flags: CrisisSessionFlag[]): Promise<void> {
    const collection = await this.getCollection()
    if (flags.length > 0) {
      const processed = flags.map(item => {
         const obj = { ...item } as any
         if (typeof obj._id === 'string') obj._id = new ObjectId!(obj._id)
         if (typeof obj.userId === 'string') obj.userId = new ObjectId!(obj.userId)
         if (typeof obj.resolvedBy === 'string') obj.resolvedBy = new ObjectId!(obj.resolvedBy)
         return obj
      })
      await collection.insertMany(processed)
    }
  }

  async findAll(): Promise<CrisisSessionFlag[]> {
      const collection = await this.getCollection()
      const flags = await collection.find({}).toArray()
      return flags.map((flag) => ({ ...flag, id: flag._id?.toString() }))
  }
}

export class ConsentManagementDAO {
  private async getCollection(): Promise<MongoCollection<ConsentManagement>> {
    await initializeDependencies()
    if (!mongodb) {
      throw new Error('MongoDB client not initialized')
    }
    const db = await mongodb.connect()
    return db.collection<ConsentManagement>('consent_management')
  }

  async getConsent(
    userId: string,
    consentType: string,
  ): Promise<ConsentManagement | null> {
    const collection = await this.getCollection()
    const consent = await collection.findOne({
      userId: new ObjectId!(userId),
      consentType,
    })

    return consent ? { ...consent, id: consent._id?.toString() } : null
  }

  async updateConsent(
    userId: string,
    consentType: string,
    granted: boolean,
    version: string,
    ipAddress?: string,
  ): Promise<ConsentManagement> {
    const collection = await this.getCollection()
    const query = { userId: new ObjectId!(userId), consentType }
    const update = {
      $set: {
        granted,
        version,
        ipAddress,
        [granted ? 'grantedAt' : 'revokedAt']: new Date(),
      },
    }

    const result = await collection.findOneAndUpdate(query, update, {
      upsert: true,
      returnDocument: 'after',
    })

    if (!result) {
      throw new Error('Failed to update consent')
    }

    return { ...result, id: result._id?.toString() }
  }

  async deleteAll(): Promise<void> {
    const collection = await this.getCollection()
    await collection.deleteMany({})
  }

  async insertMany(consents: ConsentManagement[]): Promise<void> {
    const collection = await this.getCollection()
    if (consents.length > 0) {
      const processed = consents.map(item => {
         const obj = { ...item } as any
         if (typeof obj._id === 'string') obj._id = new ObjectId!(obj._id)
         if (typeof obj.userId === 'string') obj.userId = new ObjectId!(obj.userId)
         return obj
      })
      await collection.insertMany(processed)
    }
  }

  async findAll(): Promise<ConsentManagement[]> {
      const collection = await this.getCollection()
      const consents = await collection.find({}).toArray()
      return consents.map((c) => ({ ...c, id: c._id?.toString() }))
  }
}

export class AuditLogDAO {
  private async getCollection(): Promise<MongoCollection<AuditLog>> {
    await initializeDependencies()
    if (!mongodb) {
      throw new Error('MongoDB client not initialized')
    }
    const db = await mongodb.connect()
    return db.collection<AuditLog>('audit_logs')
  }

  async logEvent(
    userId: string,
    action: string,
    resourceId: string,
    resourceType?: string,
    metadata?: Record<string, unknown>,
  ): Promise<void> {
    const collection = await this.getCollection()
    await collection.insertOne({
      userId: new ObjectId!(userId),
      action,
      resourceId,
      resourceType,
      metadata,
      timestamp: new Date(),
    } as AuditLog)
  }

  async findByUserId(
    userId: string,
    limit = 100,
    offset = 0,
  ): Promise<AuditLog[]> {
    const collection = await this.getCollection()
    const logs = await collection
      .find({ userId: new ObjectId!(userId) })
      .sort({ timestamp: -1 })
      .skip(offset)
      .limit(limit)
      .toArray()

    return logs.map((log) => ({ ...log, id: log._id?.toString() }))
  }
}

// Export instances for use throughout the application
export const userDAO = new UserDAO()
export const sessionDAO = new SessionDAO()
export const todoDAO = new TodoDAO()
export const aiMetricsDAO = new AIMetricsDAO()
export const biasDetectionDAO = new BiasDetectionDAO()
export const treatmentPlanDAO = new TreatmentPlanDAO()
export const crisisSessionFlagDAO = new CrisisSessionFlagDAO()
export const consentManagementDAO = new ConsentManagementDAO()
export const auditLogDAO = new AuditLogDAO()
export const dataExportDAO = new DataExportDAO()
